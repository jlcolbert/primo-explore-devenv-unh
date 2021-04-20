const gulp = require("gulp");
const zip = require("gulp-zip");
const http = require("http");
const https = require("https");
const util = require("util");
const glob = require("glob");
const prompt = require("prompt");
const runSequence = require("gulp4-run-sequence");

const primoProxy = require("../primoProxy");
const browserSyncManager = require("../browserSyncManager");
const config = require("../config");

gulp.task(
  "setup_watchers",
  gulp.series(
    "select-view",
    "watch-js",
    "watch-custom-scss",
    "watch-css",
    (cb) => {
      gulp.watch(config.buildParams.customPath(), (cb) => {
        cb();
        return browserSyncManager.reloadServer();
      });
      gulp.watch(config.buildParams.customCssPath(), (cb) => {
        cb();
        return gulp
          .src(config.buildParams.customCssPath())
          .pipe(browserSyncManager.streamToServer());
      });
      cb();
    }
  )
);

gulp.task(
  "connect:primo_explore",
  gulp.series("select-view", (cb) => {
    const appName = "primo-explore";
    browserSyncManager.startServer({
      label: "production",
      middleware: [
        function (req, res, next) {
          const confPath = config.getVe()
            ? "/primaws/rest/pub/configuration"
            : "/primo_library/libweb/webservices/rest/v1/configuration";
          const confAsJsPath = "/primo-explore/config_";

          const fixConfiguration = function (res, res1, isConfByFile) {
            let body = "";

            res1.setEncoding("utf8");

            res1.on("data", (chunk) => {
              body += chunk;
            });

            res1.on("end", () => {
              const vid = config.view() || "";
              const customizationProxy = primoProxy.getCustimazationObject(
                vid,
                appName
              );

              if (isConfByFile) {
                res.end("");
              } else {
                const jsonBody = JSON.parse(body);
                const newBodyObject = jsonBody;

                newBodyObject.customization = customizationProxy;
                const newBody = JSON.stringify(newBodyObject);

                res.body = newBody;

                /* Console.log('newBody: ' +newBody); */
                res.end(newBody);
              }
            });
          };

          if (
            req.url.startsWith(confAsJsPath) ||
            req.url.startsWith(confPath)
          ) {
            let isConfByFile = false;
            if (req.url.startsWith(confAsJsPath)) {
              isConfByFile = true;
            }

            const url = config.PROXY_SERVER + req.url;
            const base = config.PROXY_SERVER.replace("http://", "").replace(
              "https://",
              ""
            );
            const method = config.PROXY_SERVER.split("://")[0];
            const parts = base.split(":");
            const hostname = parts[0];
            const port = parts[1];

            const options = {
              hostname,
              port,
              path: req.url,
              method: "GET",
              headers: {
                "X-From-ExL-API-Gateway": "1",
              },
            };
            let requestObject = http;
            if (method === "https") {
              requestObject = https;
            }
            const req2 = requestObject.request(options, (res1) => {
              fixConfiguration(res, res1, isConfByFile);
            });
            req2.on("error", (e) => {
              next();
            });

            req2.write("");
            req2.end();
          } else {
            next();
          }
        },
        primoProxy.proxy_function(),
      ],
      port: 8003,
      baseDir: appName,
    });
    cb();
  })
);

gulp.task(
  "run",
  gulp.series(
    "select-view",
    "connect:primo_explore",
    "reinstall-primo-node-modules",
    "setup_watchers",
    "custom-js",
    "custom-scss",
    "custom-css"
  )
); // Watch
