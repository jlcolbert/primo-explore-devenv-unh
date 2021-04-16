const gulp = require("gulp");
const flatten = require("gulp-flatten");

const config = require("../config.js");

const { buildParams } = config;

gulp.task("watch-img", () => {
  gulp.watch(
    [buildParams.viewImgDir(), `!${buildParams.customNpmImgPath()}`],
    { interval: 1000, usePolling: true },
    gulp.series("custom-img")
  );
});

gulp.task("custom-img", () =>
  gulp
    .src(buildParams.customNpmImgPath())
    .pipe(flatten())
    .pipe(gulp.dest(buildParams.viewImgDir()))
);
