const gulp = require("gulp");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const debug = require("gulp-debug");
const wrap = require("gulp-wrap");
const glob = require("glob");

const config = require("../config.js");

const { buildParams } = config;

gulp.task(
  "watch-css",
  gulp.series("select-view", (cb) => {
    gulp.watch(
      [
        buildParams.customCssMainPath(),
        buildParams.customNpmCssPath(),
        `!${buildParams.customCssPath()}`,
      ],
      { interval: 1000, usePolling: true },
      gulp.series("custom-css")
    );
    cb();
  })
);

gulp.task(
  "custom-css",
  gulp.series("select-view", () =>
    gulp
      .src([
        buildParams.customCssMainPath(),
        buildParams.customNpmCssPath(),
        `!${buildParams.customCssPath()}`,
      ])
      .pipe(concat(buildParams.customCssFile))
      .pipe(gulp.dest(buildParams.viewCssDir()))
  )
);
