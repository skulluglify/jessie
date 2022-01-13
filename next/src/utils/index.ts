import "./skeletons"

export class skMathPolyfills extends Object implements IskMathPolyfills {

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