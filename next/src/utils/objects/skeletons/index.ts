/*
[Symbol.unscopables](): {

    copyWithin: boolean;
    entries: boolean;
    fill: boolean;
    find: boolean;
    findIndex: boolean;
    keys: boolean;
    values: boolean;
}
*/

type IskObjectWrapperType<T> = [string | symbol, T]
type IskObjectWrapperTypes<T> = Array<IskObjectWrapperType<T>>

interface IskWrapperChecker {

    // constructor: Function
}

interface IskObjectWrapper<T> {

    constructor: Function
    get(key: string): T | null
    contains(item: T): boolean
    set(key: string, value: T): void
    put(key: string, value: T): void
    update(o: object): void
    equals(o: object): boolean
    stack(o: object): void
    remove(key: string): void
    clear(): void
    [Symbol.iterator](): Iterator<IskObjectWrapperType<T>>
}

interface IskArrayWrapper<T> {

    [n: number]: T
    length: number
    toString(): string
    toLocaleString(): string
    pop(): T | undefined
    push(...items: T[]): number
    concat(...items: ConcatArray<T>[]): T[]
    concat(...items: (T | ConcatArray<T>)[]): T[]
    join(separator?: string): string
    reverse(): T[]
    shift(): T | undefined
    slice(start?: number, end?: number): T[]
    sort(compareFn?: (a: T, b: T) => number): this
    splice(start: number, deleteCount?: number): T[]
    splice(start: number, deleteCount: number, ...items: T[]): T[]
    unshift(...items: T[]): number
    indexOf(searchElement: T, fromIndex?: number): number
    lastIndexOf(searchElement: T, fromIndex?: number): number
    every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[]
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean
    every(predicate: any, thisArg?: any): boolean
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[]
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[]
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[]
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U
    find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined
    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number
    fill(value: T, start?: number, end?: number): this
    copyWithin(target: number, start: number, end?: number): this
    entries(): IterableIterator<[number, T]>
    keys(): IterableIterator<number>
    values(): IterableIterator<T>
    includes(searchElement: T, fromIndex?: number): boolean
    flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[], thisArg?: This): U[]
    flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[]
    at(index: number): T | undefined
    [Symbol.iterator](): IterableIterator<T>
    [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean }

    // it shitty
    constructor: Function
    get(index: number): T | null
    contains(value: T): boolean
    set(index: number, value: T): void
    update(o: Array<T>): void
    equals(o: Array<T>): boolean
    stack(o: Array<T>): void
    remove(value: T): void
    empty(): boolean
    clear(): void
    start(): T | null
    end(): T | null
}

interface IskWrapper {

    get Checker(): object | IskWrapperChecker 
    get Object(): object | IskObjectWrapper<any>
    get Array(): object | IskArrayWrapper<any>
}