# browser-headers
> Compatibility Layer for the Headers class

[![Master Build](https://travis-ci.org/improbable-eng/js-browser-headers.svg?branch=master)](https://travis-ci.org/improbable-eng/js-browser-headers)
![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=MVZzVGFiVXpFRjFjRmZ2SUpJaWlGam9Xa2c0R1B6MnVBV25aZm43cDZtUT0tLXZaMDdRR0pVbVFyRVBmd0p1TUNlZVE9PQ==--8b1eb510ef6bde3d6d89b2d65b033a9030f75f6f%)
[![NPM](https://img.shields.io/npm/v/browser-headers.svg)](https://www.npmjs.com/package/browser-headers)
[![Apache 2.0 License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
![quality: beta](https://img.shields.io/badge/quality-beta-yellow.svg)

The [Headers](https://fetch.spec.whatwg.org/#headers-class) class defined in the [fetch spec](https://fetch.spec.whatwg.org/) has been implemented slightly differently across browser vendors at the time of writing (Feb 2017).

This package intends to provide a wrapper for the `Headers` class to ensure a consistent API and provides headers parsing from CLRF-delimited strings.

This package is written in TypeScript, but is designed to be used just as easily by JavaScript projects.


## Installation
via npm:

```bash
$ npm install browser-headers
```

## Browser Support
This library is tested against Chrome, Safari, Firefox, Opera, Edge, IE 10 and IE 9.

## API

```js
import BrowserHeaders from 'browser-headers';

const headers = new BrowserHeaders({
  "content-type": "application/json",
  "my-header": ["value-one","value-two"]
});

headers.forEach((key, values) => {
  console.log(key, values);
});

// Output:
// "content-type", ["application/json"]
// "my-header", ["value-one","value-two"]
```

The `BrowserHeaders` class has the following methods:

#### constructor(init: Headers | {[key: string]: string|string[]} | Map<string,string|string[]> | string | BrowserHeaders, options: {splitValues: boolean}): string[]
`init` can be one of:
* An instance of `Headers`
* A CLRF-delimited string (e.g. `key-a: one\r\nkey-b: two`)
* An instance of `BrowserHeaders`
* An object consisting of `string->(string|string[])` (e.g. `{"key-a":["one","two"],"key-b":"three"}`) 
* A `Map<string, string|string[]>`

The constructor takes an additional optional `options` parameter of `{ splitValues: boolean = false }`, where 
`splitValues` defines whether the header values should be split by comma (`,`) into separate strings - this is useful 
to unify the `.append` functionality of `Headers` implementations (see the warning at the end of this README). 
`splitValues` should be used with caution and defaults to `false` because it might split what is actually a single 
logical value that contained a `,`.

#### .get(key: string): string[]
Returns all of the values for that header `key` as an array

#### .forEach(callback: (key: string, values: string[]) => void): void
Invokes the provided callback with each key and it's associated values as an array

#### .set(key: string, values: string|string[]): void
Overwrites the `key` with the value(s) specified.

#### .append(key: string, values: string|string[]): void
Appends the value(s) to specified `key`.

#### .delete(key: string, value: string): void
If the `value` is specified: 
    Removes the specified `value` from the `key` if it is present.

Otherwise:
    Removes all values for the `key` if it is present.

#### .has(key: string, value?: string): boolean
If the value is specified: 
    Returns true if the `key` contains the corresponding `value`.

Otherwise:
    Returns true if the `key` has at least one value.

#### .appendFromString(str: string): void
Appends the headers defined in the provided CLRF-delimited string (e.g. `key-a: one\r\nkey-b: two`)

#### .toHeaders(): Headers
Returns an instance of the browser's `Headers` class. This will throw an exception if the current browser does not have
the `Headers` class.

## Warning about `.append` in native `Headers`
The `.append` function of the `Headers` class differs significantly between browsers.

Some browsers concatenate the values with `", "` or just `","` and others actually maintain the individual values such that
they can return later return an array. There is a constructor option (see above: `splitValues`) that can be enabled to
attempt to parse these concatenated strings back into individual values.
```js
const headers = new Headers();
headers.append("key-A", "one");
headers.append("key-A", "two");
const keyA = headers.get("key-A"); // or .getAll depending on the browser 
console.log(typeof keyA);
console.log(keyA);

// Output in Edge 14:
// string
// one, two

// Output in Safari 10:
// string
// one,two

// Output in Chrome 56:
// object
// ["one", "two"]
```
