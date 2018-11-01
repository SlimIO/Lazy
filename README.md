# Lazy
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
