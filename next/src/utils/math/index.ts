export class skMathHelper extends Object implements IskMathHelper {

    constructor() {

        super()
    }

    degrees(radians: number): number {

        return 180 / Math.PI * radians
    }
    
    radians(degrees: number): number {
    
        return Math.PI / 180 * degrees
    }
    
    sum(...n: Array<number>): number {

        if (n.length == 0) return 0

        if (n.length == 1) return n[0]

        let [ a, ...b ]: Array<number> = n

        return a + this.sum(...b)
    }
    
    hypot(...x: Array<number>): number {
    
        return Math.sqrt(this.sum(...x))
    }
}

export default class skWebMath extends Object {

    constructor() {

        super()

        let MathHelper: skMathHelper = new skMathHelper

        let MathHelperNames: Array<string> = [

            "degrees",
            "radians",
            "sum",
            "hypot"
        ]

        Object.setPrototypeOf(this, Math)

        for (let prop of MathHelperNames) {

            if (!(prop in this)) {
                Object.defineProperty(this, prop, {
                    get: () => MathHelper[prop],
                    set: (e: any) => null,
                    configurable: true,
                    enumerable: true,
                    writable: false
                })
            }
        }
    }
}