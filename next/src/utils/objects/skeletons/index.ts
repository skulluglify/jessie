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

interface IskWrapperChecker {

    // constructor: Function
}

interface IskObjectWrapper {

    constructor: Function
    get(key: string): any
    contains(value: any): boolean
    set(key: string, value: any): void
    put(key: string, value: any): void
    update(o: object | undefined): void
    [Symbol.iterator](): Iterator<Array<[string, any]>>
}

interface IskArrayWrapper {

    constructor: Function
    get(index: number): any
    contains(value: any): boolean
    set(index: number, value: any): void
    update(o: Array<any> | undefined): void
}

interface IskWrapper {

    get Checker(): object | IskWrapperChecker 
    get Object(): object | IskObjectWrapper 
    get Array(): object | IskArrayWrapper 
}