const fsx = require("fs-extra");
const minimist = require("minimist");

const options = minimist(process.argv.slice(2));

fsx.ensureDirSync(options.to);
fsx.copy(options.from, options.to, (err) => {
  console.log(`Error: ${err}`);
});
/* Fsx.copy('111', 'tasks/111', err => {console.log('222'+err)}) */
// Fsx.copy('./node_modules/primo-explore-devenv/primo-explore/primo-explore-location-item-after', '/tmp/mynewdir', err => {})
