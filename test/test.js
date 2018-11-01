// Require Third-party Dependencies
const ava = require("ava");

// Require Internal Dependencies
const Lazy = require("../");

ava("Lazy.of(primitive) should throw a TypeError", (assert) => {
    const { message } = assert.throws(() => {
        Lazy.of(10);
    }, TypeError);
    assert.is(message, "obj should be a JavaScript object value");
});

ava("Lazy.defineProperty(primitive) should throw a TypeError", (assert) => {
    const { message } = assert.throws(() => {
        Lazy.defineProperty(10);
    }, TypeError);
    assert.is(message, "obj should be a JavaScript object value");
});

ava("Define lazyProperty with defineProperty() method", (assert) => {
    const obj = {};
    Lazy.defineProperty(obj, "foo", () => "bar");
    assert.deepEqual(Object.keys(obj), []);
    assert.deepEqual(Reflect.ownKeys(obj), ["foo"]);
    assert.is(obj.foo, "bar");
    assert.deepEqual(Object.keys(obj), ["foo"]);
});

ava("Define lazyProperty with of.set() method", (assert) => {
    const obj = {};
    const lp = Lazy.of(obj);
    assert.true(obj === lp.value);

    lp.set("foo", () => "bar");
    assert.deepEqual(Object.keys(obj), []);
    assert.deepEqual(Reflect.ownKeys(obj), ["foo"]);
    assert.is(obj.foo, "bar");
    assert.deepEqual(Object.keys(obj), ["foo"]);
});

ava("Define lazyProperty on freezed Object should throw an Error", (assert) => {
    const obj = Object.freeze({});
    const { message } = assert.throws(() => {
        Lazy.defineProperty(obj, "foo", "bar");
    }, Error);
    assert.is(message, "Failed to define lazy property on given Object!");
});
