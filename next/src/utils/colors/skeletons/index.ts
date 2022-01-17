interface IskWebColorFormatter {

    hsl2hsv(h: number, s: number, l: number): Array<number>
    hsl2rgb(h: number, s: number, l: number): Array<number>
    hsv2hsl(h: number, s: number, v: number): Array<number>
    hsv2rgb(h: number, s: number, v: number): Array<number>
    rgb2hsv(r: number, g: number, b: number): Array<number>
    rgb2hsl(r: number, g: number, b: number): Array<number>
}


interface IskWebColorHueSaturationLightness {

    hue: number
    saturation: number
    lightness: number
    alpha: number
    setAlpha(alpha: number): IskWebColorHueSaturationLightness
    toString(): string
    toHSV(): IskWebColorHueSaturationValue
    toRGB(): IskWebColorRGB
    toHex(): string
}

interface IskWebColorHueSaturationValue {

    hue: number
    saturation: number
    value: number
    alpha: number
    setAlpha(alpha: number): IskWebColorHueSaturationValue
    toString(): string
    toHSL(): IskWebColorHueSaturationLightness
    toRGB(): IskWebColorRGB
    toHex(): string
}

interface IskWebColorRGB {
    
    red: number
    green: number
    blue: number
    alpha: number
    setAlpha(alpha: number): IskWebColorRGB
    toString(): string
    toHSL(): IskWebColorHueSaturationLightness
    toHSV(): IskWebColorHueSaturationValue
    toHex(): string
}

interface IskWebColor {

    WebColorHueSaturationLightness(hue: number, saturation: number, lightness: number): IskWebColorHueSaturationLightness
    WebColorHueSaturationValue(hue: number, saturation: number, value: number): IskWebColorHueSaturationValue
    WebColorRGB(red: number, green: number, blue: number): IskWebColorRGB
    get WebColorFormater(): IskWebColorFormatter
}