enum skVCTypes {

    BOOL        = 2,
    CHAR        = 8,
    SHORT       = 16,
    INT         = 32,
    LONG_INT    = 64,
    FLOAT       = 32,
    DOUBLE      = 64,
    LONG_DOUBLE = 128
}

// unsigned

enum skVCTypesShort {

    Int8     = 8,
    Int16    = 16,
    Int32    = 32,
    Int64    = 64,
    Float32  = 32,
    Float64  = 64,
    Float128 = 128
}

// object types

interface IskVCTypesClass {

    bool: number
    char: number
    short: number
    int: number
    long: number
    float: number
    double: number
}

// bytearray

interface IskVCByteArrayStatic {

    MIN_SIZE_OF_PER_BYTE: number
    buffer: Array<number>
    type: skVCTypesShort
    size: number
    constructor: Function
    init(): void
    set(index: number, value: number): void
    get(index: number): number
    getLength(): number
    getSize(): number
    toBuffer(type: skVCTypesShort): IskVCByteArrayStatic
}

interface IskVCByteArray<T> {

    push(value: T): void
    slice(start: number, end: number): IskVCByteArray<T>
    splice(start: number, deleteCount: number, ...item: Array<T>): IskVCByteArray<T>
    empty(): boolean
    clear(): void
    shift(): T
    pop(): T
}