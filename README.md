# Lazy
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/is/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![Version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Lazy/master/package.json&query=$.version&label=Version)
[![Build Status](https://travis-ci.com/SlimIO/Lazy.svg?branch=master)](https://travis-ci.com/SlimIO/Lazy)

SlimIO Little lib to set Lazy Properties on JavaScript Objects!

> **Warning** Lazy Property are set to writable: false

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/lazy
# or
$ yarn add @slimio/lazy
```

## Usage example

```js
// lp stand for Lazy Proxy
const lp = Lazy.of({});

lp.set("foo", () => "bar");
lp.set("hello", () => {
    // Do job here
});

module.exports = lp.value;
```

Under the hood the lib use the ECMAScript Reflection API to ensure that the property is set (else it will throw an Error).

```js
const obj = Object.freeze({});
Lazy.defineProperty(obj, "foo", () => "bar"); // throw Error
```

## Licence
MIT
