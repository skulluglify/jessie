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

type IskObjectWrapperTypes = Array<[string | symbol, any]>
type IskObjectWrapperTypeKey = string | symbol
type IskObjectWrapperTypeValue = any
type IskObjectWrapperType = [string | symbol, any]

interface IskWrapperChecker {

    // constructor: Function
}

interface IskObjectWrapper<T, U> {

    constructor: Function
    get(key: string): any
    contains(value: any): boolean
    set(key: string, value: any): void
    put(key: string, value: any): void
    update(o: object): void
    equals(o: object): boolean
    stack(o: object): void
    remove(key: string): void
    clear(): any
    [Symbol.iterator](): Iterator<IskObjectWrapperType>
}

interface IskArrayWrapper<T> {

    // implements Array
    [n: number]: any
    length: number
    toString(): string
    toLocaleString(): string
    pop(): any
    push(...items: Array<any>): number
    concat(...items: Array<any>): Array<any>
    join(separator?: string): string
    reverse(): Array<any>
    shift(): any
    slice(start?: number, end?: number): Array<any>
    sort(compareFn?: (a: any, b: any) => number): this
    splice(start: number, deleteCount: number, ...items: Array<any>): Array<any>
    unshift(...items: Array<any>): number
    indexOf(searchElement: any, fromIndex?: number): number
    lastIndexOf(searchElement: any, fromIndex?: number): number
    every<S extends any>(predicate: (value: any, index: number, array: Array<any>) => value is S, thisArg?: any): this is S[]
    every(predicate: (value: any, index: number, array: Array<any>) => unknown, thisArg?: any): boolean
    every(predicate: any, thisArg?: any): boolean
    some(predicate: (value: any, index: number, array: Array<any>) => unknown, thisArg?: any): boolean
    forEach(callbackfn: (value: any, index: number, array: Array<any>) => void, thisArg?: any): void
    map<U>(callbackfn: (value: any, index: number, array: Array<any>) => U, thisArg?: any): U[]
    filter<S extends any>(predicate: (value: any, index: number, array: Array<any>) => value is S, thisArg?: any): S[]
    filter(predicate: (value: any, index: number, array: Array<any>) => unknown, thisArg?: any): Array<any>
    reduce<U>(callbackfn: (previousValue: U, currentValue: any, currentIndex: number, array: Array<any>) => U, initialValue: U): U
    reduce(callbackfn: any, initialValue?: any): any
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: any, currentIndex: number, array: Array<any>) => U, initialValue: U): U
    reduceRight(callbackfn: any, initialValue?: any): any
    find<S extends any>(predicate: (this: void, value: any, index: number, obj: Array<any>) => value is S, thisArg?: any): S | undefined
    find(predicate: any, thisArg?: any): any
    findIndex(predicate: (value: any, index: number, obj: Array<any>) => unknown, thisArg?: any): number
    fill(value: any, start?: number, end?: number): this
    copyWithin(target: number, start: number, end?: number): this
    entries(): IterableIterator<[number, any]>
    keys(): IterableIterator<number>
    values(): IterableIterator<any>
    includes(searchElement: any, fromIndex?: number): boolean
    flatMap<U, This = undefined>(callback: (this: This, value: any, index: number, array: Array<any>) => U | readonly U[], thisArg?: This): U[]
    flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[]
    at(index: number): any
    [Symbol.iterator](): IterableIterator<any>
    [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean }

    constructor: Function
    get(index: number): any
    contains(value: any): boolean
    set(index: number, value: any): void
    update(o: Array<any>): void
    equals(o: Array<any>): boolean
    stack(o: Array<any>): void
    remove(value: string): void
    empty(): boolean
    clear(): any
    start(): any
    end(): any
}

interface IskWrapper {

    get Checker(): object | IskWrapperChecker 
    get Object(): object | IskObjectWrapper<string, any>
    get Array(): object | IskArrayWrapper<any>
}