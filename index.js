function defineProperty(obj, propertyName, lazyFunctionValue) {
    const res = Reflect.defineProperty(obj, propertyName, {
        configurable: true,
        get: function() {
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
        throw new Error(`Failed to define lazy property on given Object!`);
    }
}

function of(obj) {
    return {
        set(propertyName, lazyFunctionValue) {
            return defineProperty(obj, propertyName, lazyFunctionValue);
        },
        value: obj
    }
}

module.exports = {
    of,
    defineProperty
};