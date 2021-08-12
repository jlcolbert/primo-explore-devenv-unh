/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const gulp = require("gulp");
const wrap = require("gulp-wrap");
const templateCache = require("gulp-angular-templatecache");
const fs = require("fs");

const config = require("../config.js");

const { buildParams } = config;

function parseModuleName() {
  let mainJsContent = fs.readFileSync(
    `${buildParams.viewJsDir()}/main.js`,
    "utf8"
  );
  const moduleString = "angular.module('";
  let index = mainJsContent.indexOf(moduleString) + moduleString.length;
  mainJsContent = mainJsContent.slice(index);
  index = mainJsContent.indexOf("'");
  const module = mainJsContent.slice(0, index);
  return module;
}

function prepareTempltesWithBrowserify() {
  const module = parseModuleName();
  return gulp
    .src(`${buildParams.viewHtmlDir()}/templates/**/*.html`)
    .pipe(
      templateCache({
        filename: "customTemplates.js",
        module,
        transformUrl(url) {
          return url.replace(/^\/+/g, "");
        },
      })
    )
    .pipe(gulp.dest(buildParams.viewJsDir()));
}

function prepareTemplates() {
  if (config.getBrowserify()) {
    return prepareTempltesWithBrowserify();
  }

  return gulp
    .src([
      `${buildParams.viewHtmlDir()}/templates/**/*.html`,
      buildParams.customNpmHtmlPath(),
    ])
    .pipe(
      templateCache({
        filename: "customTemplates.js",
        templateHeader: "app.run(function($templateCache) {",
        templateFooter: "});",
        transformUrl(url) {
          return url.replace(/^\/+/g, "");
        },
      })
    )
    .pipe(gulp.dest(buildParams.viewJsDir()));
}

gulp.task(
  "custom-html-templates",
  gulp.series("select-view", (cb) => {
    prepareTemplates().on("end", cb);
  })
);
