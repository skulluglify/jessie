// polyfill Array.isArray
if (!Array.hasOwnProperty("isArray")) {
    Object.defineProperty(Array, "isArray", {
        value: function __wrapper__ (o: any) {
            return !!o && typeof o == "object" && Array.prototype.isPrototypeOf(o)
        },
        configurable: false,
        enumerable: false,
        writable: false
    })
}
// polyfill Number.isNaN
if (!Number.hasOwnProperty("isNaN")) {
    Object.defineProperty(Array, "isNaN", {
        value: function __wrapper__ (o: any) {
            return !!o && typeof o == "number" && "" + o == "NaN"
        },
        configurable: false,
        enumerable: false,
        writable: false
    })
}
// polyfill Number.isFinite
if (!Number.hasOwnProperty("isFinite")) {
    Object.defineProperty(Array, "isFinite", {
        value: function __wrapper__ (o: any) {
            return !!o && typeof o == "number" && "" + o != "NaN"
        },
        configurable: false,
        enumerable: false,
        writable: false
    })
}
// fibonacci
// prime