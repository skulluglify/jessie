import "./skeletons"

/*

|00000000|00000000|00000000|

groups N array

16

2 4
32 64

/8
4 8

2

2 4
4 16

/8
1 2

to String

*/

export class skVCByteArrayStatic extends Object implements IskVCByteArrayStatic {

    MIN_SIZE_OF_PER_BYTE: number

    buffer: Array<number>
    type: skVCTypesShort
    size: number

    constructor(size: number, type?: skVCTypesShort) {

        super()
        
        size = !!size ? size : 0
        type = !!type ? type : skVCTypesShort.Int8

        this.MIN_SIZE_OF_PER_BYTE = skVCTypesShort.Int8

        this.buffer = new Array
        this.type = type
        this.size = size * type

        this.init()
    }

    init(): void {

        let m: number
        m = Math.floor(this.size / this.type)

        for (let i = 0; i < m; i++) {

            this.buffer.push(0)
        }
    }

    set(index: number, value: number): void {

        let m: number
        m = Math.floor(this.size / this.type)
        
        if (0 <= index && index <= m) {

            this.buffer[index] = value
        }
    }

    get(index: number): number {

        let m: number
        m = Math.floor(this.size / this.type)
        
        if (0 <= index && index <= m) {

            return this.buffer[index]
        }

        return 0
    }

    getLength(): number {

        return Math.floor(this.size / this.type)
    }

    getSize(): number {

        return this.size
    }

    toBuffer(type: skVCTypesShort): IskVCByteArrayStatic {

        let index: number
        index = 0
        
        let m: number
        let n: number
        let v: number
        let z: number
        
        m = Math.floor(this.size / this.type)
        n = type <= this.type ? Math.floor(this.type / type) : Math.floor(type / this.type)
        v = 0
        z = Math.pow(2, type) - 1

        let s: number
        s = 0

        if (type < this.type) {

            s = m * n
            
        } else {

            s = m
        }

        let b = new skVCByteArrayStatic(s, type)

        while (index < m) {

            // Int8 to Int32 1 4
            // Int32 to Int8 4 1

            if (this.type < type) {
                
                v = this.buffer[index]

                b.buffer[Math.floor(index / n)] += v << ((index % n) * this.type)

            } else
            if (this.type > type) {

                v = this.buffer[index]

                let k = index * n

                for (let j = k; j < k + n; j++) {

                    b.buffer[j] = v >> (this.type - ((j % n) * type) - this.MIN_SIZE_OF_PER_BYTE) & z

                }

            } else {

                b.buffer[index] = this.buffer[index]
            }

            index = index + 1
        }

        return b
    }
}

export class skVCByteArray<T> extends Object implements IskVCByteArray<T> {

    constructor() {

        super()
    }
    push(value: T): void {
        throw new Error("Method not implemented.")
    }
    slice(start: number, end: number): IskVCByteArray<T> {
        throw new Error("Method not implemented.")
    }
    splice(start: number, deleteCount: number, ...item: Array<T>): IskVCByteArray<T> {
        throw new Error("Method not implemented.")
    }
    empty(): boolean {
        throw new Error("Method not implemented.")
    }
    shift(): T {
        throw new Error("Method not implemented.")
    }
    pop(): T {
        throw new Error("Method not implemented.")
    }
    clear(): void {
        throw new Error("Method not implemented.")
    }
}

export class skCLib extends Object {

    bytearray: Function

    constructor() {

        super()

        this.bytearray = skVCByteArray
    }
}