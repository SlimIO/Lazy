// Require Third-party Dependencies
const is = require("@slimio/is");

/**
 * @namespace Lazy
 */

/**
 * @exports Lazy/defineProperty
 * @function defineProperty
 * @desc Define a new Lazy property on a given Object!
 * @param {!Object} obj JavaScript Object
 * @param {!String} propertyName Object Property (Member) name
 * @param {Function} lazyFunctionValue Lazy Function that will return final value
 * @return {void}
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
 * @exports Lazy/of
 * @function of
 * @desc Get a Lazy clojure manager for a given object
 * @param {!Object} obj JavaScript Object
 * @returns {*}
 *
 * @throws {TypeError}
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
