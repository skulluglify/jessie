import "./skeletons"
import skWebColor from "./colors"
import skWebMath from "./math"
import skString from "./strings"


Object.defineProperty(global, "skWebMath", {
	value: new skWebMath,
	configurable: true,
	enumerable: true,
	writable: false
})

Object.defineProperty(global, "skWebColor", {
	value: new skWebColor,
	configurable: true,
	enumerable: true,
	writable: false
})