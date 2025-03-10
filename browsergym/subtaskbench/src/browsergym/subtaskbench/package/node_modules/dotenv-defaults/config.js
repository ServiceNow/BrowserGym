// The purpose of this file is to be able to load the module with...
//  ... "require("dotenv-defaults/config")" in JavaScript or "import "dotenv-defaults/config"" in TypeScript...
//  ... or "node -r dotenv-defaults/config script.js" from the command line

(function () {
  require('./src/index').config()
})()
