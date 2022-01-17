import "./skeletons"
import { skStringMap } from "../strings"

export class skWebColorFormatter extends Object implements IskWebColorFormatter {
    
    constructor() {

        super()
    }

    hsv2hsl(h: number, s: number, v: number): Array<number> {

        let l: number, m: number

        l = v - v * s / 2.0
        m = Math.min(l, 1 - l)
        
        return [

            h,
            m && (v - l) / m,
            1
        ]
    }

    hsv2rgb(h: number, s: number, v: number): Array<number> {

        let f = (n: number, k: number = ( n + h / 60.0 ) % 6): number => v - v * s * Math.max( Math.min( k, 4 - k, 1 ), 0)   
        
        return [

            f(5),
            f(3),
            f(1)
        ]; 
    }

    hsl2hsv(h: number, s: number, l: number): Array<number> {

        let v: number

        v = s * Math.min(l, 1 - l) + l

        return [
            h,
            v && 2 - 2 * l / v,
            v
        ]
    }

    hsl2rgb(h: number, s: number, l: number): Array<number> {
        
        let a: number = s * Math.min(l, 1 - l)
        let f = (n: number, k: number = (n + h / 30) % 12): number => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return [

            f(0),
            f(8),
            f(4)
        ]        
    }

    rgb2hsv(r: number, g: number, b: number): Array<number> {
        
        let v: number, c: number, h: number

        v = Math.max(r, g, b)
        c = v - Math.min(r, g, b)
        h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c))

        return [
            60 * (h < 0 ? h + 6 : h),
            v && c / v,
            v
        ]
    }

    rgb2hsl(r: number, g: number, b: number): Array<number> {
        
        let v: number, c: number, f: number, h: number
        
        v = Math.max(r, g, b)
        c = v - Math.min(r, g, b)
        f = (1 - Math.abs(v + v - c - 1))
        h = c && ((v == r) ? (g - b) / c : ((v == g) ? 2 + (b - r) / c : 4 + (r - g) / c))
        
        return [
            60 * (h < 0 ? h + 6 : h),
            f && c / f,
            (v + v - c) / 2
        ]
    }
}

export class skWebColorHueSaturationLightness extends Object implements IskWebColorHueSaturationLightness {
    
    hue: number = 0
    saturation: number = 0
    lightness: number = 0
    alpha: number = 1

    constructor(hue: number, saturation: number, lightness: number, alpha?: number) {

        super()

        this.hue = typeof hue == "number" ? (hue <= 1 && 0 <= hue ? hue : 0) : 0
        this.saturation = typeof saturation == "number" ? (saturation <= 1 && 0 <= saturation ? saturation : 0) : 0
        this.lightness = typeof lightness == "number" ? (lightness <= 1 && 0 <= lightness ? lightness : 0) : 0
        this.alpha = typeof alpha == "number" ? (alpha <= 1 && 0 <= alpha ? alpha : 0) : 0
    }

    setAlpha(alpha: number): IskWebColorHueSaturationLightness {
        
        this.alpha = typeof alpha == "number" ? (alpha <= 1 && 0 <= alpha ? alpha : 0) : 0
        return this
    }

    toString(): string {

        let h, s, l, a

        h = Math.min(Math.floor(this.hue * 256), 255)
        s = Math.round(this.saturation * 100)
        l = Math.round(this.lightness * 100)
        a = this.alpha

        return a < 1 ? `hsla(${h},${s}%,${l}%,${a})` : `hsl(${h},${s}%,${l}%)`
    }

    toHSV(): IskWebColorHueSaturationValue {

        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, v ]: Array<number> = WebColorFormater.hsl2hsv(this.hue,this.saturation,this.lightness)
        
        return new skWebColorHueSaturationValue(h, s, v, this.alpha)
    }

    toRGB(): IskWebColorRGB {
        
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ r, g, b ]: Array<number> = WebColorFormater.hsl2rgb(this.hue,this.saturation,this.lightness)
        
        return new skWebColorRGB(r, g, b, this.alpha)
    }

    toHex(): string {

        let a: number
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ r, g, b ]: Array<number> = WebColorFormater.hsl2rgb(this.hue,this.saturation,this.lightness)
        
        r = Math.min(Math.floor(r * 256), 255)
        g = Math.min(Math.floor(g * 256), 255)
        b = Math.min(Math.floor(b * 256), 255)
        a = Math.min(Math.floor(this.alpha * 256), 255)

        let stringMap: IskStringMap = new skStringMap
        let array: Array<number> = new Array

        array.push(r)
        array.push(g)
        array.push(b)
        if (this.alpha < 1) array.push(a)

        return "\#" + array.map((e: number): string => {

            return (stringMap.hexdigits.at(e >> 4 & 15) || "0") + (stringMap.hexdigits.at(e >> 0 & 15) || "0")
        
        }).join("")
    }
}

export class skWebColorHueSaturationValue extends Object implements IskWebColorHueSaturationValue {
    
    hue: number = 0
    saturation: number = 0
    value: number = 0
    alpha: number = 1


    constructor(hue: number, saturation: number, value: number, alpha?: number) {

        super()

        this.hue = typeof hue == "number" ? (hue <= 1 && 0 <= hue ? hue : 0) : 0
        this.saturation = typeof saturation == "number" ? (saturation <= 1 && 0 <= saturation ? saturation : 0) : 0
        this.value = typeof value == "number" ? (value <= 1 && 0 <= value ? value : 0) : 0
        this.alpha = typeof alpha == "number" ? (alpha <= 1 && 0 <= alpha ? alpha : 0) : 0
    }

    setAlpha(alpha: number): IskWebColorHueSaturationValue {
        
        this.alpha = typeof alpha == "number" ? (alpha <= 1 && 0 <= alpha ? alpha : 0) : 0
        return this
    }

    toString(): string {

        let h, s, v, a

        h = Math.min(Math.floor(this.hue * 256), 255)
        s = Math.round(this.saturation * 100)
        v = Math.round(this.value * 100)
        a = this.alpha

        return a < 1 ? `hsva(${h},${s}%,${v}%,${a})` : `hsv(${h},${s}%,${v}%)`
    }

    toHSL(): IskWebColorHueSaturationLightness {
        
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, l ]: Array<number> = WebColorFormater.hsv2hsl(this.hue,this.saturation,this.value)
        
        return new skWebColorHueSaturationLightness(h, s, l, this.alpha)
    }

    toRGB(): IskWebColorRGB {
        
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ r, g, b ]: Array<number> = WebColorFormater.hsv2rgb(this.hue,this.saturation,this.value)
        
        return new skWebColorRGB(r, g, b, this.alpha)
    }

    toHex(): string {

        let a: number
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ r, g, b ]: Array<number> = WebColorFormater.hsv2rgb(this.hue,this.saturation,this.value)
        
        r = Math.min(Math.floor(r * 256), 255)
        g = Math.min(Math.floor(g * 256), 255)
        b = Math.min(Math.floor(b * 256), 255)
        a = Math.min(Math.floor(this.alpha * 256), 255)

        let stringMap: IskStringMap = new skStringMap
        let array: Array<number> = new Array

        array.push(r)
        array.push(g)
        array.push(b)
        if (this.alpha < 1) array.push(a)

        return "\#" + array.map((e: number): string => {

            return (stringMap.hexdigits.at(e >> 4 & 15) || "0") + (stringMap.hexdigits.at(e >> 0 & 15) || "0")
        
        }).join("")
    }
}

export class skWebColorRGB extends Object implements IskWebColorRGB {
    
    red: number = 0
    green: number = 0
    blue: number = 0
    alpha: number = 1

    constructor(red: number, green: number, blue: number, alpha?: number) {

        super()

        this.red = typeof red == "number" ? (red <= 1 && 0 <= red ? red : 0) : 0
        this.green = typeof green == "number" ? (green <= 1 && 0 <= green ? green : 0) : 0
        this.blue = typeof blue == "number" ? (blue <= 1 && 0 <= blue ? blue : 0) : 0
        this.alpha = typeof alpha == "number" ? (alpha <= 1 && 0 <= alpha ? alpha : 0) : 0
    }

    setAlpha(alpha: number): IskWebColorRGB {
        
        this.alpha = typeof alpha == "number" ? (alpha <= 1 && 0 <= alpha ? alpha : 0) : 0
        return this
    }

    toString(): string {

        let r, g, b, a

        r = Math.min(Math.floor(this.red * 256), 255)
        g = Math.min(Math.floor(this.green * 256), 255)
        b = Math.min(Math.floor(this.blue * 256), 255)
        a = this.alpha

        return a < 1 ? `rgba(${r},${g},${b},${a})` : `rgb(${r},${g},${b})`
    }

    toHSL(): IskWebColorHueSaturationLightness {

        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, l ]: Array<number> = WebColorFormater.rgb2hsl(this.red, this.green, this.blue)
        
        return new skWebColorHueSaturationLightness(h, s, l, this.alpha)
    }

    toHSV(): IskWebColorHueSaturationValue {

        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, v ]: Array<number> = WebColorFormater.rgb2hsv(this.red,this.green,this.blue)
        
        return new skWebColorHueSaturationValue(h, s, v, this.alpha)
    }

    toHex(): string {

        let r: number, g: number, b: number, a: number

        r = this.red
        g = this.green
        b = this.blue
        
        r = Math.min(Math.floor(r * 256), 255)
        g = Math.min(Math.floor(g * 256), 255)
        b = Math.min(Math.floor(b * 256), 255)
        a = Math.min(Math.floor(this.alpha * 256), 255)

        let stringMap: IskStringMap = new skStringMap
        let array: Array<number> = new Array

        array.push(r)
        array.push(g)
        array.push(b)
        if (this.alpha < 1) array.push(a)

        return "\#" + array.map((e: number): string => {

            return (stringMap.hexdigits.at(e >> 4 & 15) || "0") + (stringMap.hexdigits.at(e >> 0 & 15) || "0")
        
        }).join("")
    }
}

export default class skWebColor extends Object implements IskWebColor {
    
    constructor() {

        super()
    }

    WebColorHueSaturationLightness(hue: number, saturation: number, lightness: number): IskWebColorHueSaturationLightness {
        

        return new skWebColorHueSaturationLightness(hue, saturation, lightness)
    }

    WebColorHueSaturationValue(hue: number, saturation: number, value: number): IskWebColorHueSaturationValue {
        

        return new skWebColorHueSaturationValue(hue, saturation, value)
    }

    WebColorRGB(red: number, green: number, blue: number): IskWebColorRGB {
        

        return new skWebColorRGB(red, green, blue)
    }

    get WebColorFormater(): IskWebColorFormatter {

        return new skWebColorFormatter
    }
}