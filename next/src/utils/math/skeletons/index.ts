interface IskMathHelper {

    degrees(radians: number): number
    radians(degrees: number): number
    sum(...n: Array<number>): number
    hypot(...x: Array<number>): number
}