const customFile = "custom.js";
const customModuleFile = "custom.module.js";
const customCssFile = "custom1.css";
const mainFile = "main.js";

let browserify;
let view;
let ve;
let useScss;
let reinstallNodeModules;
let saml;
let cas;

const SERVERS = {
  local: "http://localhost:8002",
};

/**
 * The URL to your sandbox or production Primo instance.
 * For SSL environments (https), the port number (443) must be included.
 *
 * Examples:
 *   var PROXY_SERVER = 'http://abc-primo.hosted.exlibrisgroup.com'
 *   var PROXY_SERVER = 'https://abc-primo.hosted.exlibrisgroup.com:443'
 */
const PROXY_SERVER = "https://unh.primo.exlibrisgroup.com:443";

function setView(_view) {
  view = _view;
}

function setSaml(_saml) {
  saml = _saml;
}

function getSaml() {
  return saml;
}

function setCas(_cas) {
  cas = _cas;
}

function getCas() {
  return cas;
}

function setUseScss(_useScss) {
  useScss = _useScss;
  this.useScss = _useScss;
}

function getUseScss() {
  return useScss;
}

function setProxy(_proxy) {
  this.PROXY_SERVER = _proxy;
}
function getProxy() {
  return PROXY_SERVER;
}
function getVe() {
  return ve;
}

function setVe(_ve) {
  ve = _ve;
}
function getBrowserify() {
  return browserify;
}

function setBrowserify(_browserify) {
  browserify = _browserify;
}

function setReinstallNodeModules(_reinstallNodeModules) {
  reinstallNodeModules = _reinstallNodeModules;
}

function getReinstallNodeModules() {
  return reinstallNodeModules;
}

function getView() {
  return view;
}

function viewJsDir() {
  return `primo-explore/custom/${view}/js`;
}

function customPath() {
  return `${viewJsDir()}/${customFile}`;
}

function customModulePath() {
  return `${viewJsDir()}/${customModuleFile}`;
}

function viewHtmlDir() {
  return `primo-explore/custom/${view}/html`;
}

function mainPath() {
  return `${viewJsDir()}/*.js`;
}

function mainJsPath() {
  return `${viewJsDir()}/${mainFile}`;
}

function viewCssDir() {
  return `primo-explore/custom/${view}/css`;
}

function customCssMainPath() {
  return `${viewCssDir()}/*.css`;
}
function customColorsPath() {
  return `colors.json`;
}

function viewRootDir() {
  return `primo-explore/custom/${view}`;
}

function customScssDir() {
  return `primo-explore/custom/${view}/scss`;
}

function customScssMainPath() {
  return `${customScssDir()}/main.scss`;
}

function customCssPath() {
  return `primo-explore/custom/${view}/css/custom1.css`;
}

function customNpmModuleRootDir() {
  return `primo-explore/custom/${view}/node_modules`;
}

function customNpmJsCustomPath() {
  return `primo-explore/custom/${view}/node_modules/primo-explore*/js/custom.js`;
}

function customNpmJsModulePath() {
  return `primo-explore/custom/${view}/node_modules/primo-explore*/js/custom.module.js`;
}

function customNpmJsPath() {
  return `primo-explore/custom/${view}/node_modules/primo-explore*/js/*.js`;
}

function customNpmDistPath() {
  return `primo-explore/custom/${view}/node_modules/primo-explore*/dist/*.js`;
}

function customNpmCssPath() {
  return `primo-explore/custom/${view}/node_modules/primo-explore*/css/*.css`;
}

function customNpmHtmlPath() {
  return `primo-explore/custom/${view}/node_modules/primo-explore*/html/*.html`;
}

const buildParams = {
  customFile,
  customCssFile,
  customPath,
  customModulePath,
  mainPath,
  mainJsPath,
  viewRootDir,
  viewJsDir,
  viewHtmlDir,
  viewCssDir,
  customScssDir,
  customScssMainPath,
  customCssPath,
  customNpmModuleRootDir,
  customNpmJsPath,
  customNpmDistPath,
  customNpmJsCustomPath,
  customNpmJsModulePath,
  customNpmCssPath,
  customNpmHtmlPath,
  customCssMainPath,
  customColorsPath,
};

module.exports = {
  buildParams,
  PROXY_SERVER,
  setView,
  setUseScss,
  getUseScss,
  setProxy,
  getReinstallNodeModules,
  setReinstallNodeModules,
  proxy: getProxy,
  view: getView,
  getBrowserify,
  setBrowserify,
  getVe,
  setVe,
  getSaml,
  setSaml,
  getCas,
  setCas,
};
