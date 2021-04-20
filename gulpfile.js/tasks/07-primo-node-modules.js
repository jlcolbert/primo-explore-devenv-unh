const del = require("del");
const { execSync } = require("child_process");
const gulp = require("gulp");
const gutil = require("gulp-util");
const runSequence = require("gulp4-run-sequence");

const config = require("../config.js");

/**
 * Metatask that executes the two atomic tasks in order
 * to re-install all primo-explore related node modules
 * of the view package
 *
 * Will only execute the atomic tasks when the run task
 * is called with the --reinstallNodeModules parameter
 *
 * e.g. gulp run --view [ViewName] --reinstallNodeModules
 */
gulp.task(
  "reinstall-primo-node-modules",
  gulp.series("select-view", (cb) => {
    if (config.getReinstallNodeModules()) {
      runSequence(
        "delete-primo-node-modules",
        "install-primo-node-modules",
        cb
      );
      return;
    }
    cb();
  })
);

/**
 * Deletes all primo-explore related node modules of the view package.
 */
gulp.task("delete-primo-node-modules", (cb) => {
  gutil.log(
    "Starting deletion of the view package's primo explore related node modules."
  );

  del.sync([`${config.buildParams.customNpmModuleRootDir()}/primo-explore*`]);

  gutil.log(
    "Finished deletion of the view package's primo explore related node modules."
  );
  cb();
});

/**
 * Reinstalls all primo-explore related node modules of the view package by
 * executing the "npm install" command.
 *
 * This requires that all relevant primo-explore modules need to be referenced
 * in the package.json file in the root folder of the view package.
 */
gulp.task("install-primo-node-modules", (cb) => {
  gutil.log(
    "Starting re-installation of the view package's node modules using >npm install< command."
  );

  execSync(
    "npm install",
    {
      cwd: config.buildParams.viewRootDir(),
    },
    (error, stdout, stderr) => {
      if (error) {
        gutil.log(error);
      }

      if (stdout) {
        gutil.log(stdout);
      }

      if (stderr) {
        gutil.log(stderr);
      }
    }
  );

  gutil.log(
    "Finished re-installation of the view package's node modules using >npm install< command."
  );
  cb();
});
