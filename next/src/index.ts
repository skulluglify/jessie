import { skMathPolyfills } from "./utils"
import "./query"

Object.defineProperty(globalThis, "skMathPolyfills", {

    get: () => new skMathPolyfills,
    set: (e) => { /* ignored */ },
    enumerable: false,
    configurable: false
})

export default {

    skMathPolyfills: new skMathPolyfills
}