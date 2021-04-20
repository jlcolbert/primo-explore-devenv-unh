const gulp = require("gulp");
const glob = require("glob");
const http = require("http");
const https = require("https");
const prompt = require("prompt");
const extractor = require("css-color-extractor");
const { spawn } = require("child_process");
const { exec } = require("child_process");
const shell = require("shelljs");
const fs = require("fs");

const config = require("../config");

gulp.task("css-colors", () => {
  const proxyServer = config.PROXY_SERVER;
  const method = config.PROXY_SERVER.split("://")[0];

  let cssFileName = "";
  const url = `${proxyServer}/primo-explore/index.html`;
  let requestObject = http;
  if (method === "https") {
    requestObject = https;
  }

  requestObject
    .get(url, (res1) => {
      let body = "";
      res1.setEncoding("utf8");

      res1.on("data", (chunk) => {
        body += chunk;
      });

      res1.on("end", () => {
        const regEx = new RegExp('<link href="(lib/app-.*?.css)"', "g");
        const result = regEx.exec(body);
        cssFileName = result[1];

        const cssFile = `${proxyServer}/primo-explore/${cssFileName}`;

        requestObject
          .get(cssFile, (res1) => {
            let body = "";
            res1.setEncoding("utf8");

            res1.on("data", (chunk) => {
              body += chunk;
            });

            res1.on("end", () => {
              fs.writeFile("primo-explore/tmp/app.css", body, (err) => {
                console.log(
                  "run the following command to get all css color definitions : \r\n"
                );
                console.log(
                  "css-color-extractor primo-explore/tmp/app.css --format=css  > primo-explore/tmp/colors.css"
                );
              });
            });
          })
          .on("error", (e) => {
            console.log("error fetching css file");
          });
      });
    })
    .on("error", (e) => {
      console.log("error fetching css file");
    });

  /*
   *Var cssFile = glob.sync(proxyServer + "/primo-explore/lib/app**.css", {});
   *console.log('11111: ' + proxyServer);
   */

  /* Console.log("1111: " + css-color-extractor http://il-primo17:1703/primo-explore/lib/app-fdcb4c32c9.css --format=css ) */

  /*
   *Var basedir = 'primo-explore/custom/';
   *var customFolderExp = basedir+'*!/';
   *console.log('Please Choose a package to create:');
   *glob(customFolderExp, {}, function (er, files) {
   * // Note elision, there is no member at 2 so it isn't visited
   *console.log('\r\n');
   *files.forEach(function(element, index, array){
   *console.log(index+1 + ': '+ element.replace(basedir,'').replace('/',''));
   *console.log('\r\n');
   *});
   *prompt.start();
   *var property = {
   *name: 'package',
   *message: 'Please Choose the level you want to create the package for'
   *};
   *prompt.get(property, function (err, result) {
   *
   *console.log('\r\n');
   *var code = result.package;
   *
   *if(files[result.package - 1]){
   *code = files[result.package - 1].replace(basedir,'').replace('/','');
   *}
   *console.log('Creating package for : ('+code+'.zip)');
   *console.log(code);
   *console.log(' in  : /packages');
   *console.log('\r\n');
   *console.log('............................................................................................................................................');
   *return gulp.src('./primo-explore/custom/'+code+'/!**')
   *.pipe(zip(code+'.zip'))
   *.pipe(gulp.dest('./packages/'));
   *});
   *
   *})
   */
});
