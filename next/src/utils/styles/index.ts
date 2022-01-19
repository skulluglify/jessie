import "./transforms"
import { skWebStyleTransforms } from "./transforms"

// debug
Object.defineProperty(global, "skWebStyleTransforms", {
	value: new skWebStyleTransforms,
	configurable: true,
	enumerable: true,
	writable: false
})