const autoprefixer = require("gulp-autoprefixer");

const config = require("../config").buildParams;
const isVe = require("../config").getVe;

const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const debug = require("gulp-debug");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");

const splitCss = require("../cssSplitter");

const merge = require("merge-stream");
const clone = require("gulp-clone");
const template = require("gulp-template");
const request = require("request");
const zlib = require("zlib");
const tar = require("tar-fs");

const stylesBaseDir = "www/styles/partials";
const templateFile = `${stylesBaseDir}/_variables.tmpl.scss`;
const OTBColorsFile = `${stylesBaseDir}/../colors.json`;
const scssFile = "_variables.scss";
const runSequence = require("gulp4-run-sequence");
const fs = require("fs");
const del = require("del");
const lodashMerge = require("lodash/merge");
const gutil = require("gulp-util");

const proxy_server = require("../config").PROXY_SERVER;
const useScss = require("../config").getUseScss;

gulp.task("cleanup", () => del(["www"]));

gulp.task("extract-scss-files", () => {
  const proxy_server = require("../config").PROXY_SERVER;
  let prefix;
  if (isVe()) {
    prefix = "/discovery";
  } else {
    prefix = "/primo-explore";
  }
  const url = `${proxy_server + prefix}/lib/scsss.tar.gz`;
  console.log(url);
  const headers = {
    /* 'Accept-Encoding': 'gzip' */
  };

  return request({ url, headers })
    .pipe(zlib.createGunzip()) // Unzip
    .pipe(
      tar.extract(".", {
        map: (header) => {
          if (header.name.indexOf("src/main/webapp") > -1) {
            header.name = header.name.replace("src/main/webapp", "www");
          }
          return header;
        },
      })
    );
});
gulp.task("color-variables", () => {
  const colorVariables = JSON.parse(
    fs.readFileSync(`${config.viewCssDir()}/../colors.json`, "utf8")
  );
  const colorVariablesOTB = JSON.parse(fs.readFileSync(OTBColorsFile, "utf8"));
  const colorsMeregd = lodashMerge(colorVariablesOTB, colorVariables);
  return gulp
    .src(templateFile)
    .pipe(template(colorsMeregd))
    .pipe(rename(scssFile))
    .pipe(gulp.dest(stylesBaseDir))
    .pipe(gulp.dest(`${config.customScssDir()}/partials`));
});

gulp.task("compile-scss", () => {
  const allCss = gulp
    .src("www/styles/main.scss")
    .pipe(
      plumber({
        errorHandler(err) {
          console.log(`Error:${err}`);
          this.emit("end");
        },
      })
    )
    // .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    );
  const colorStream = allCss
    .pipe(clone())
    .pipe(rename("app-colors.css"))
    // .pipe(cssnano({safe: true}))
    .pipe(splitCss({ colors: true }))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.viewCssDir()));

  return colorStream;
});

gulp.task("app-css", (cb) => {
  runSequence(
    "extract-scss-files",
    "color-variables",
    "compile-scss",
    "cleanup",
    cb
  );
});

/**
 * Task to watch custom scss files contained in /scss directory in view package folder
 *
 * Please note. The logic of this task will only execute if the run task is
 * executed with the "useScss" parameter, e.g.: gulp run --view UNIBZ --useScss
 */
gulp.task(
  "watch-custom-scss",
  gulp.series("select-view", (cb) => {
    if (!useScss()) {
      cb();
      return;
    }
    gulp.watch(
      [`${config.customScssDir()}/**/*.scss`],
      { interval: 1000, usePolling: true },
      gulp.series("custom-scss")
    );
    cb();
  })
);

/**
 * Compiles the custom scss to a css file called custom-scss-compiled.css which
 * in turn is then concatenated with all other css files present in the /css folder
 * of the view package folder to the custom1.css file that constitutes the entirety
 * of the view package css.
 *
 * Please note. The logic of this task will only execute if the run task is
 * executed with the "useScss" parameter, e.g.: gulp run --view UNIBZ --useScss
 */
gulp.task(
  "custom-scss",
  gulp.series("select-view", (cb) => {
    if (!useScss()) {
      cb();
      return;
    }

    gutil.log("Start Creating custom CSS from custom SCSS");

    const customScss = gulp
      .src(config.customScssMainPath(), { allowEmpty: true })
      .pipe(
        plumber({
          errorHandler(err) {
            console.log(`1111111${err}`);
            this.emit("end");
          },
        })
      )
      // .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(
        autoprefixer({
          cascade: false,
        })
      )
      .pipe(rename("custom-scss-compiled.css"))
      .pipe(gulp.dest(config.viewCssDir()));

    gutil.log("End Creating custom CSS from custom SCSS");
    cb();
    return customScss;
  })
);
