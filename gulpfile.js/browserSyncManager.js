const browserSync = require("browser-sync");

module.exports = {
  closeServer,
  reloadServer,
  streamToServer,
  startServer,
};

function closeServer(label) {
  browserSync.get(label).exit();
}

function reloadServer(label) {
  return browserSync.get("production").reload();
}

function streamToServer() {
  return browserSync.get("production").stream();
}

function startServer(args) {
  const { label } = args;
  const { port } = args;
  const { baseDir } = args;
  const { middleware } = args;
  const { open } = args;

  const server = browserSync.create(label);
  const conf = {
    port,
    server: {
      baseDir,
    },
    open,
  };
  if (middleware) {
    conf.middleware = args.middleware;
  }
  server.init(conf);
}
