const through = require("through2");
const applySourceMap = require("vinyl-sourcemaps-apply");
const findIndex = require("lodash/findIndex");

module.exports = function (options) {
  function transform(file, encoding, callback) {
    options = options || {};
    // Generate source maps if plugin source-map present
    if (file.sourceMap) {
      options.makeSourceMaps = true;
    }

    // Do normal plugin logic
    const result = myTransform(file.contents, options);
    file.contents = new Buffer(result.code);

    /*
     * Apply source map to the chain
     * If (file.sourceMap) {
     *     ApplySourceMap(file, result.map);
     * }
     */

    this.push(file);
    callback();
  }

  return through.obj(transform);
};

function myTransform(contents, options) {
  const stringArr = contents.toString("utf8").split("\n");
  const ind1 = findIndex(stringArr, (e) =>
    e.includes("/* primary color hook */")
  );
  const ind2 = findIndex(stringArr, (e) =>
    e.includes("/* primary color hook end*/")
  );
  const colors = stringArr.splice(ind1, ind2 - ind1 + 1);
  let newContent;
  if (options.colors) {
    newContent = colors.join("\n");
  } else {
    newContent = stringArr.join("\n");
  }
  return {
    code: newContent,
  };
}
