const Lazy = require("./index");

const obj = {};
const lp = Lazy.of(obj);
lp.set("test", () => "hello world!");
console.log(obj);
console.log(obj.test);
console.log(obj);
