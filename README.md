# Lazy
![Version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Lazy/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/is/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![size](https://img.shields.io/bundlephobia/min/@slimio/lazy.svg?style=flat)
![1DEP](https://img.shields.io/badge/Dependencies-1-yellow.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/SlimIO/Lazy/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SlimIO/Lazy?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/Lazy.svg?branch=master)](https://travis-ci.com/SlimIO/Lazy)
[![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/Lazy.svg)](https://greenkeeper.io/)

SlimIO package to achieve [Lazy evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation) on JavaScript Objects! It use getter/setter to evaluate a function which return the final value at runtime (only when the property is requested).

## Requirements
- Node.js v10 or higher

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

## API

### defineProperty(target, propertyName, lazyFunctionValue): void
Define a new lazy property with a given name on **target**. Similar to [Object.defineProperty](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/defineProperty).

The property descriptors will be defined as follow:
```json
{
    "enumerable": true,
    "writable": false
}
```

### lazy.of< T >(target: T): LazyClojure< T >
Create a lazy clojure described by the following interface:
```ts
interface LazyClojure<T> {
    set(propertyName: string, lazyFunctionValue: lazyHandler): void;
    value: T;
}
```

The **set** method is a mirror of the root **defineProperty** method.
```js
const lp = Lazy.of({});
lp.set("foo", () => "bar");

const obj = lp.value;
```

## License
MIT
