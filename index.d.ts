/// <reference types="node" />
/// <reference types="@types/node" />

declare namespace Lazy {
    type lazyHandler = () => any;

    interface LazyClojure<T> {
        set(propertyName: string, lazyFunctionValue: lazyHandler): void;
        value: T;
    }

    export function of<T>(obj: T): LazyClojure<T>;
    export function defineProperty(obj: any, propertyName: string, lazyFunctionValue: lazyHandler): void;
}

export as namespace Lazy;
export = Lazy;
