import "./skeletons"

export class skVCTypesClass extends Object implements IskVCTypesClass {
    
    bool: number
    char: number
    short: number
    int: number
    long: number
    float: number
    double: number

    constructor() {

        super()

        this.bool = skVCTypes.BOOL
        this.char = skVCTypes.CHAR
        this.short = skVCTypes.SHORT
        this.int = skVCTypes.INT
        this.long = skVCTypes.LONG_INT
        this.float = skVCTypes.FLOAT
        this.double = skVCTypes.DOUBLE
    }
}