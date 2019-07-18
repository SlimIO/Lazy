"use strict";

// Require Third-party Dependencies
const is = require("@slimio/is");

/**
 * @namespace Lazy
 * @author GENTILHOMME Thomas
 */

/**
 * @version 1.0.0
 *
 * @exports Lazy/defineProperty
 * @function defineProperty
 * @memberof Lazy#
 * @description Define a new Lazy property on a given Object!
 * @param {!object} obj JavaScript Object
 * @param {!string} propertyName Object Property (Member) name
 * @param {Function} lazyFunctionValue Lazy Function that will return final value
 * @returns {void}
 *
 * @throws {TypeError}
 * @throws {Error}
 */
function defineProperty(obj, propertyName, lazyFunctionValue) {
    if (!is.object(obj)) {
        throw new TypeError("obj should be a JavaScript object value");
    }

    // eslint-disable-next-line
    const res = Reflect.defineProperty(obj, propertyName, {
        configurable: true,
        get: function get() {
            const value = lazyFunctionValue();
            Reflect.defineProperty(this, propertyName, {
                writable: false,
                enumerable: true,
                value
            });

            return value;
        }
    });
    if (!res) {
        throw new Error("Failed to define lazy property on given Object!");
    }
}

/**
 * @version 1.0.0
 *
 * @exports Lazy/of
 * @function of
 * @memberof Lazy#
 * @description Get a Lazy clojure manager for a given object
 * @param {!object} obj JavaScript Object
 * @returns {*}
 *
 * @throws {TypeError}
 *
 * @example
 * const lp = Lazy.of({});
 *
 * lp.set("foo", () => "bar");
 * lp.set("hello", () => {
 *     // Do job here
 * });
 *
 * const myObj = lp.value;
 */
function of(obj) {
    if (!is.object(obj)) {
        throw new TypeError("obj should be a JavaScript object value");
    }

    return {
        set(propertyName, lazyFunctionValue) {
            return defineProperty(obj, propertyName, lazyFunctionValue);
        },
        value: obj
    };
}

module.exports = {
    of,
    defineProperty
};
