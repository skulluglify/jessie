import "./skeletons"
import skWebColor from "./colors"
import skWebMath from "./math"
import skWrapper from "./objects"
import skString from "./strings"

import "./styles"
import "./cvt"
import { skVCByteArrayStatic } from "./vc/memory"


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

Object.defineProperty(global, "skWrapper", {
	value: new skWrapper,
	configurable: true,
	enumerable: true,
	writable: false
})


Object.defineProperty(global, "skVCByteArrayStatic", {
	value: skVCByteArrayStatic,
	configurable: true,
	enumerable: true,
	writable: false
})