import "./skeletons"
import skWebColor from "./colors"
import skWebMath from "./math"
import skString from "./strings"


Object.defineProperty(global, "skWebMath", {
	get: () => new skWebMath,
	set: (e: any) => null,
	configurable: true,
	enumerable: true
})

Object.defineProperty(global, "skWebColor", {
	get: () => new skWebColor,
	set: (e: any) => null,
	configurable: true,
	enumerable: true
})