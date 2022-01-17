import "./skeletons"

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
            m ? (v - l) / m : 0, // single if - statement
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
            v ? 2 - 2 * l / v : 0,
            v
        ]
    }

    hsl2rgb(h: number, s: number, l: number): Array<number> {
        
        let a: number
        a = s * Math.min(l, 1 - l)
        
        let f = (n: number, k: number = ( n + h / 30.0 ) % 12 ): number => l - a * Math.max( Math.min( k - 3, 9 - k, 1), -1)

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
            c / v,
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
            f ? c / f : 0,
            (v + v - c) / 2
        ]
    }
}

export class skWebColorHueSaturationLightness extends Object implements IskWebColorHueSaturationLightness {
    
    hue: number = 0
    saturation: number = 0
    lightness: number = 0

    constructor(hue: number, saturation: number, lightness: number) {

        super()

        this.hue = hue
        this.saturation = saturation
        this.lightness = lightness
    }

    toString(): string {

        let h, s, l

        h = Math.min(Math.floor(this.hue * 256), 255)
        s = this.saturation * 100
        l = this.lightness * 100

        return `hsl(${h},${s}%,${l}%)`
    }

    toHSV(): IskWebColorHueSaturationValue {

        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, v ]: Array<number> = WebColorFormater.hsl2hsv(this.hue,this.saturation,this.lightness)
        
        return new skWebColorHueSaturationValue(h, s, v)
    }

    toRGB(): IskWebColorRGB {
        
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ r, g, b ]: Array<number> = WebColorFormater.hsl2rgb(this.hue,this.saturation,this.lightness)
        
        return new skWebColorRGB(r, g, b)
    }
}

export class skWebColorHueSaturationValue extends Object implements IskWebColorHueSaturationValue {
    
    hue: number = 0
    saturation: number = 0
    value: number = 0


    constructor(hue: number, saturation: number, value: number) {

        super()

        this.hue = hue
        this.saturation = saturation
        this.value = value
    }

    toString(): string {

        let h, s, v

        h = Math.min(Math.floor(this.hue * 256), 255)
        s = this.saturation * 100
        v = this.value * 100

        return `hsl(${h},${s}%,${v}%)`
    }

    toHSL(): IskWebColorHueSaturationLightness {
        
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, l ]: Array<number> = WebColorFormater.hsv2hsl(this.hue,this.saturation,this.value)
        
        return new skWebColorHueSaturationLightness(h, s, l)
    }

    toRGB(): IskWebColorRGB {
        
        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ r, g, b ]: Array<number> = WebColorFormater.hsv2rgb(this.hue,this.saturation,this.value)
        
        return new skWebColorRGB(r, g, b)
    }
}

export class skWebColorRGB extends Object implements IskWebColorRGB {
    
    red: number = 0
    green: number = 0
    blue: number = 0

    constructor(red: number, green: number, blue: number) {

        super()

        this.red = red
        this.green = green
        this.blue = blue
    }

    toString(): string {

        let r, g, b

        r = Math.min(Math.floor(this.red * 256), 255)
        g = Math.min(Math.floor(this.green * 256), 255)
        b = Math.min(Math.floor(this.blue * 256), 255)

        return `rgb(${r},${g},${b})`
    }

    toHSL(): IskWebColorHueSaturationLightness {

        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, l ]: Array<number> = WebColorFormater.rgb2hsl(this.red, this.green, this.blue)
        
        return new skWebColorHueSaturationLightness(h, s, l)
    }

    toHSV(): IskWebColorHueSaturationValue {

        let WebColorFormater: skWebColorFormatter = new skWebColorFormatter

        let [ h, s, v ]: Array<number> = WebColorFormater.rgb2hsv(this.red,this.green,this.blue)
        
        return new skWebColorHueSaturationValue(h, s, v)
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