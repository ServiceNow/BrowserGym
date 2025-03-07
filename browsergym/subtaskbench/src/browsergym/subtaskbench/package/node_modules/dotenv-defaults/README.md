# dotenv-defaults

A dotenv system that supports defaults

### Status

![npm](https://img.shields.io/npm/v/dotenv-defaults.svg)
[![Main](https://github.com/mrsteele/dotenv-defaults/actions/workflows/main.yml/badge.svg)](https://github.com/mrsteele/dotenv-defaults/actions/workflows/main.yml)
[![dependabot badge](https://badgen.net/dependabot/mrsteele/dotenv-defaults?icon=dependabot)](https://dependabot.com/)

### Installation

Use the following to install this module.

```
npm i dotenv-defaults --save
```

### Usage

This module supports all the features from the original [dotenv](https://www.npmjs.com/package/dotenv) module, so usage should be simple enough:

```
# .env.defaults, safe to commit
HOST=website.com
EMAIL=test@email.com
```

```
# .env, DO NOT COMMIT
HOST=omnionline.us
```

The result

```js
require('dotenv-defaults').config()

// Or you can also load it directly like this
require('dotenv-defaults/config')

console.log(process.env.HOST)
// Outputs: omnionline.us

console.log(process.env.EMAIL)
// Outputs: test@email.com
```

##### TypeScript
Since this module does not provide TypeScript Type Definitions if you try to import it like `import dotenv from "dotenv-defaults"` TypeScript will return an error.

Instead you should load it like this:
```typescript
import "dotenv-defaults/config"
```

##### CLI
You can also call this module directly when using the node executable.
So, for example if you are running a custom script with node and you want to load your environment variables you can do the following `node -r dotenv-defaults/config your-script.js`. (_When using this method, please make sure that you have installed dotenv-defaults with npm or yarn in the same directory_)

### Differences

The only thing to note is that the original module supported an `options` argument in the `config` function.

This module supports that as well, but there is an added `defaults` property that can allow you to define where that file is located. An example is shown below:

```js
// all of these are the default values...
require(`dotenv-defaults`).config({
  path: './.env',
  encoding: 'utf8',
  defaults: './.env.defaults' // This is new
})
```

### License

MIT
