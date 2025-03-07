Webpack node modules externals
==============================
> Easily exclude node modules in Webpack

[![Version](https://img.shields.io/npm/v/webpack-node-externals.svg)](https://www.npmjs.org/package/webpack-node-externals)
[![Downloads](https://img.shields.io/npm/dm/webpack-node-externals.svg)](https://www.npmjs.org/package/webpack-node-externals)
[![Build Status](https://travis-ci.org/liady/webpack-node-externals.svg?branch=master)](https://travis-ci.org/liady/webpack-node-externals)

Webpack allows you to define [*externals*](https://webpack.js.org/configuration/externals) - modules that should not be bundled.

When bundling with Webpack for the backend - you usually don't want to bundle its `node_modules` dependencies.
This library creates an *externals* function that ignores `node_modules` when bundling in Webpack.<br/>(Inspired by the great [Backend apps with Webpack](http://jlongster.com/Backend-Apps-with-Webpack--Part-I) series)

## Quick usage
```sh
npm install webpack-node-externals --save-dev
```

In your `webpack.config.js`:
```js
const nodeExternals = require('webpack-node-externals');
...
module.exports = {
    ...
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    ...
};
```
And that's it. All node modules will no longer be bundled but will be left as `require('module')`.

**Note**: For Webpack 5, replace `target: 'node'` with the `externalsPreset` object:
```js
// Webpack 5

const nodeExternals = require('webpack-node-externals');
...
module.exports = {
    ...
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    ...
};
```

## Detailed overview
### Description
This library scans the `node_modules` folder for all node_modules names, and builds an *externals* function that tells Webpack not to bundle those modules, or any sub-modules of theirs.

### Configuration
This library accepts an `options` object.

#### `options.allowlist (=[])`
An array for the `externals` to allow, so they **will** be included in the bundle. Can accept exact strings (`'module_name'`), regex patterns (`/^module_name/`), or a function that accepts the module name and returns whether it should be included.
<br/>**Important** - if you have set aliases in your webpack config with the exact same names as modules in *node_modules*, you need to allowlist them so Webpack will know they should be bundled.

#### `options.importType (='commonjs')`
The method in which unbundled modules will be required in the code. Best to leave as `commonjs` for node modules.
May be one of [documented options](https://webpack.js.org/configuration/externals/#externals) or function `callback(moduleName)` which returns custom code to be returned as import type, e.g:
```js
options.importType = function (moduleName) {
    return 'amd ' + moduleName;
}
```

#### `options.modulesDir (='node_modules')`
The folder in which to search for the node modules.

#### `options.additionalModuleDirs (='[]')`
Additional folders to look for node modules.

#### `options.modulesFromFile (=false)`
Read the modules from the `package.json` file instead of the `node_modules` folder.
<br/>Accepts a boolean or a configuration object:
```js
{
    modulesFromFile: true,
    /* or */
    modulesFromFile: {
        fileName: /* path to package.json to read from */,
        includeInBundle: [/* whole sections to include in the bundle, i.e 'devDependencies' */],
        excludeFromBundle: [/* whole sections to explicitly exclude from the bundle, i.e only 'dependencies' */]
    }
}
```

## Usage example
```js
var nodeExternals = require('webpack-node-externals');
...
module.exports = {
    ...
    target: 'node', // important in order not to bundle built-in modules like path, fs, etc.
    externals: [nodeExternals({
        // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
        allowlist: ['jquery', 'webpack/hot/dev-server', /^lodash/]
    })],
    ...
};
```
    
For most use cases, the defaults of `importType` and `modulesDir` should be used.

## Q&A
#### Why not just use a regex in the Webpack config?
Webpack allows inserting [regex](https://webpack.js.org/configuration/externals/#regex) in the *externals* array, to capture non-relative modules:
```js
{
    externals: [
        // Every non-relative module is external
        // abc -> require("abc")
        /^[a-z\-0-9]+$/
    ]
}
```
However, this will leave unbundled **all non-relative requires**, so it does not account for aliases that may be defined in webpack itself.
This library scans the `node_modules` folder, so it only leaves unbundled the actual node modules that are being used.

#### How can I bundle required assets (i.e css files) from node_modules?
Using the `allowlist` option, this is possible. We can simply tell Webpack to bundle all files with extensions that are not js/jsx/json, using this [regex](https://regexper.com/#%5C.(%3F!(%3F%3Ajs%7Cjson)%24).%7B1%2C5%7D%24):
```js
...
nodeExternals({
  // load non-javascript files with extensions, presumably via loaders
  allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
}),
...
```
Thanks @wmertens for this idea.

#### Why is not bundling node_modules a good thing?

When writing a node library, for instance, you may want to split your code to several files, and use Webpack to bundle them. However - you wouldn't want to bundle your code with its entire node_modules dependencies, for two reasons:

1. It will bloat your library on npm.
2. It goes against the entire npm dependencies management. If you're using Lodash, and the consumer of your library also has the same Lodash dependency, npm makes sure that it will be added only once. But bundling Lodash in your library will actually make it included twice, since npm is no longer managing this dependency.

As a consumer of a library, I want the library code to include only its logic, and just state its dependencies so they could me merged/resolved with the rest of the dependencies in my project. Bundling your code with your dependencies makes it virtually impossible.

In short: **It's useful if your code is used by something that has dependencies managed by npm**

## Contribute
Contributions and pull requests are welcome. Please run the tests to make sure nothing breaks.
### Test
```sh
npm run test
```

## License
MIT
