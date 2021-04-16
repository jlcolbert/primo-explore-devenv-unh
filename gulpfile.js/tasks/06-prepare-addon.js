const gulp = require("gulp");
const { spawn } = require("child_process");
const fs = require("fs");
const Promise = require("bluebird");
const prompt = require("prompt");
const camelCase = require("camel-case");
const streamToPromise = require("stream-to-promise");
const colors = require("colors/safe");
const path = require("path");

const config = require("../config.js");

const { buildParams } = config;

gulp.task(
  "prepare-addon",
  gulp.series("select-view", "custom-js", "custom-scss", "custom-css", () => {
    const view = config.view();
    const packageJsonPath = `${buildParams.viewRootDir()}/package.json`;
    let npmId;
    let directoryName;
    let hookName;

    const runNpmInitIfNeeded = new Promise((resolve, reject) => {
      if (!fs.existsSync(packageJsonPath)) {
        const childProcess = spawn("npm", ["init"], {
          cwd: buildParams.viewRootDir(),
          shell: true,
          stdio: "inherit",
        });

        childProcess.on("error", (err) => {
          reject(err);
        });

        childProcess.on("exit", (code, signal) => {
          if (!code) {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });

    return runNpmInitIfNeeded
      .then(findNpmIdInPackageJson, handleError)
      .then(makeDirectory, handleError)
      .then(copyFiles, handleError)
      .then(compileAddon, handleError)
      .then(createDescriptorJson, handleError)
      .then(announceFinishedProcess, handleError);

    function findNpmIdInPackageJson() {
      return new Promise((resolve, reject) => {
        fs.exists(packageJsonPath, (exists) => {
          if (exists) {
            fs.readFile(packageJsonPath, (err, data) => {
              if (err) {
                reject(err);
              }
              const packageJson = JSON.parse(data.toString());
              npmId = camelCase(packageJson.name);
              resolve();
            });
          }
        });
      });
    }

    function makeDirectory() {
      return new Promise((resolve, reject) => {
        directoryName = `./addons/${npmId}`;
        fs.mkdir(directoryName, (err) => reject(err));
        resolve();
      });
    }

    function copyFiles() {
      return streamToPromise(
        gulp
          .src(
            [
              `./primo-explore/custom/${view}/package*.json`,
              `./primo-explore/custom/${view}/html/**`,
              `./primo-explore/custom/${view}/img/**`,
              `./primo-explore/custom/${view}/css/custom1.css`,
              `./primo-explore/custom/${view}/js/custom.js`,
            ],
            { base: `./primo-explore/custom/${view}` }
          )
          .pipe(gulp.dest(directoryName))
      );
    }

    function compileAddon() {
      return new Promise((resolve, reject) => {
        const customJsPath = `${directoryName}/js/${buildParams.customFile}`;
        if (fs.existsSync(customJsPath)) {
          fs.readFile(customJsPath, (err, data) => {
            if (err) {
              reject(err);
            }
            let dataString = data.toString();

            // Remove comments
            dataString = dataString.replace(
              /\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,
              ""
            );

            // Group 1 = component name, group 2 = controller name if exists controller
            const componentRegex = /\.component[\s]*?\([\s]*?['"](prm.*?After)['"](?:(?:(?!\.component)[\s\S])*?controller[\s]*?:[\s]*?['"](.*)['"])?/g;

            if (dataString.match(componentRegex).length > 1) {
              const arr = [];
              let match;
              while ((match = componentRegex.exec(dataString))) {
                arr.push(match[1]);
              }
              reject(
                new Error(
                  `Only one Primo hook allowed, you tried to use several: ${arr.toString()}`
                )
              );
            }

            let match = componentRegex.exec(dataString);

            if (match) {
              hookName = match[1];
              const controllerName = match[2]; // May be null

              dataString = dataString.replace(
                new RegExp(controllerName || "", "g"),
                `${npmId}Controller`
              );
              dataString = dataString.replace(new RegExp(hookName, "g"), npmId);
            }

            // Remove wrapping function
            const wrappingFunctionRegex = /\s*?\(\s*?function\s*?\(\s*?\)\s*?{\s*(?:["']use strict["'];\s*)?([\s\S]*)\s*?}\s*?\)\s*?\(\s*?\)\s*?;?/g;
            if ((match = wrappingFunctionRegex.exec(dataString))) {
              dataString = dataString.replace(wrappingFunctionRegex, match[1]);
            }

            /*
             * Remove app declaration
             * group 1 = app variable name
             */
            const appDeclarationViewOrCentralCustomRegex = /[\s]*(?:var|let)?[\s]*(.*?)[\s]*=[\s]*angular[\s]*\.module\([\s]*['"](?:view|central)Custom['"][\s]*,[\s]*\[['"]angularLoad['"]\]\);/g;
            if (
              (match = appDeclarationViewOrCentralCustomRegex.exec(dataString))
            ) {
              // Remove matched line
              dataString = dataString.replace(
                appDeclarationViewOrCentralCustomRegex,
                ""
              );

              // Change all the occurrences of the variable to 'app'
              const variableName = match[1];
              if (variableName !== "app") {
                const variableUseRegex = new RegExp(
                  `([[=(,]\\s*?)${variableName}([^\\w])|([^\\w])${variableName}(\\s*?[.)|\\]}=;])`,
                  "gm"
                );
                dataString = dataString.replace(
                  variableUseRegex,
                  "$1$3app$2$4"
                );
              }
            }

            /*
             * Remove constant config if exists
             * group 1 = config name
             */
            const studioConfigDeclerationRegex = /\.(?:constant|value|service|factory)[\s]*?\([\s]*['"](.*?StudioConfig)/g;
            if (dataString.match(studioConfigDeclerationRegex)) {
              dataString = dataString.replace(
                studioConfigDeclerationRegex,
                "$&DevenvTest"
              );
            }

            // Group 1 = module name
            const moduleRegex = /\.module[\s]*?\([\s]*((?:').*?(?:')|(?:").*?(?:")|.*?)[\s]*?[),]/g;

            // Push all modules
            while ((match = moduleRegex.exec(dataString))) {
              dataString = `${dataString}\napp.requires.push(${match[1]});`;
            }

            // Write content to {{npmId}}.js
            const wstream = fs.createWriteStream(
              `${directoryName}/js/${npmId}.js`
            );
            wstream.write(dataString);
            wstream.end();

            // Delete custom.js file
            fs.unlink(customJsPath, (err1) => {
              if (err1) {
                reject(err1);
              }
            });

            resolve();
          });
        } else {
          resolve();
        }
      });
    }

    function createDescriptorJson() {
      return new Promise((resolve, reject) => {
        const npmignorePath = `${directoryName}/.npmignore`;
        const descriptorJsonFileName = "descriptor.json";
        const descriptorJsonPath = `${directoryName}/${descriptorJsonFileName}`;

        console.log("Creating '.npmignore' file\n");

        // Create .npmignore file with descriptor.json
        let wstream = fs.createWriteStream(npmignorePath);
        wstream.write(`${descriptorJsonFileName}\n`);
        wstream.end();

        console.log("Creating 'descriptor.json' file\n");

        // Needed values for descriptor.json: face (image), notes (description), who (author), what (title), linkGit, npmid, version, hook
        const descriptor = {
          face: "",
          notes: "",
          who: "",
          what: "",
          linkGit: "",
          npmid: "",
          version: "",
          hook: hookName,
        };

        // Get known values from package.json
        fs.readFile(packageJsonPath, (err, data) => {
          if (err) {
            reject(err);
          }
          const packageJson = JSON.parse(data.toString());
          descriptor.notes = packageJson.description;
          descriptor.who = packageJson.author.name || packageJson.author; // Maybe empty, but is string
          if (packageJson.repository) {
            descriptor.linkGit =
              packageJson.repository.url || packageJson.repository; // Maybe null
          }
          descriptor.npmid = packageJson.name;
          descriptor.version = packageJson.version;

          /*
           * Until here have: notes (description), who (author) {maybe}, linkGit {maybe}, npmid, version, hook
           * need to ask for: face (image), who (author) {maybe}, what (title), linkGit {maybe}
           */

          // Ask for values not exists already
          console.log(
            "This utility will walk you through creating a 'descriptor.json' file.\n" +
              "It only covers the most common items, and tries to guess sensible defaults."
          );
          prompt.start();
          prompt.colors = false;
          prompt.message = "";
          const properties = [
            {
              name: "what",
              message: "Enter title",
              required: true,
              default: descriptor.npmid,
            },
            {
              name: "face",
              message: "Enter a link to photo of you",
              required: true,
            },
          ];

          if (!descriptor.who) {
            properties.push({
              name: "who",
              message: "Enter author/s name/s",
              required: true,
            });
          }

          if (!descriptor.linkGit) {
            properties.push({
              name: "linkGit",
              message: "Enter link to repository",
              required: true,
            });
          }

          prompt.get(properties, (err, result) => {
            if (err) {
              reject(err);
            }

            descriptor.what = result.what;
            descriptor.face = result.face;
            if (result.who) {
              descriptor.who = result.who;
            }
            if (result.linkGit) {
              descriptor.linkGit = result.linkGit;
            }

            // Create descriptor json with values
            wstream = fs.createWriteStream(descriptorJsonPath);
            wstream.write(JSON.stringify(descriptor));
            wstream.close();

            resolve();
          });
        });
      });
    }

    function announceFinishedProcess() {
      console.log("\n");
      process.stdout.write("Finished compiling addon\n");
      console.log("");
      process.stdout.write(colors.green("Addon can be found at "));
      process.stdout.write(colors.cyan(path.resolve(`./addons/${npmId}`)));
      process.stdout.write(
        colors.green(
          ".\nIn order to publish to NPM:  Navigate to the addon folder. Review the 'package.json' file. Then run 'npm publish'.\n"
        )
      );
      process.stdout.write(
        colors.green(
          "A basic descriptor for your addon was created in the file 'descriptor.json'. Please review it and edit fields accordingly.\n"
        )
      );
      process.stdout.write(
        colors.green(
          "When you are ready to publish to Primo-Studio, create a pull request at "
        )
      );
      process.stdout.write(
        colors.cyan(
          "https://github.com/primousers/primostudio/tree/submit_here"
        )
      );
      process.stdout.write(
        colors.green(
          " appending your descriptor to the 'features.json' file.\n"
        )
      );
    }

    function handleError(err) {
      // If fails at any time - clean addon folder
      if (directoryName) {
        fs.unlink(directoryName);
      }
      console.error(err.message);
    }
  })
);
