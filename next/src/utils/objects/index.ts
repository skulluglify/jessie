import "./skeletons"
import "./helper"

export class skWrapperChecker extends Object implements IskWrapperChecker {

    constructor() {

        super()
    }

    static isObject(o: any): boolean {

        return !!o && typeof o == "object" && !Array.isArray(o)
    }

    static isArray(o: any): boolean {

        return !!o && typeof o == "object" && Array.isArray(o)
    }

    static isNumber(o: any): boolean {

        return (!!o || "" + o == "0") && typeof o == "number"
    }

    static isNaN(o: any): boolean {

        return (!!o || "" + o == "0") && typeof o == "number" && Number.isNaN(o)
    }

    static isInfinity(o: any): boolean {

        return (!!o || "" + o == "0") && typeof o == "number" && !Number.isFinite(o)
    }

    static isNumeric(o: any): boolean {

        return (!!o || "" + o == "0") && this.isNumber(o) && !this.isNaN(o) && !this.isInfinity(o)
    }

    static isString(o: any): boolean {

        if (!!o && this.isArray(o)) {

            return o.every((e: any) => this.isString(e))
        }

        return !!o && typeof o == "string"
    }

    static isSymbol(o: any): boolean {

        return !!o && typeof o == "symbol"
    }

    static isMap(o: any): boolean {

        return !!o && this.isObject(o) && Map.prototype.isPrototypeOf(o)
    }

    static isSet(o: any): boolean {

        return !!o && this.isObject(o) && Set.prototype.isPrototypeOf(o)
    }
}

export class skObjectWrapper extends Object implements IskObjectWrapper {

    constructor(o?: object | undefined) {

        super()

        if (!!o && skWrapperChecker.isObject(o)) this.update(o)
    }

    get(key: string): any {

        let map: Array<[string, any]>

        map = Object.entries(this)

        if (map.length > 0) {

            for (let [ k, v ] of map) {
    
                if (key == k) {
    
                    return v
                }
            }
        }

        return null
    }

    contains(value: string): boolean {

        if (!!value) {

            for (let v of Object.values(this)) {

                if (value == v) {

                    return true
                }
            }
        }

        return false 
    }

    set(key: string, value: any): void {
        
        if (!!key && this.hasOwnProperty(key)) {

            this.put(key, value)
        }
    }
    
    put(key: string, value: any): void {
        
        Object.defineProperty(this, key, {

            value: value,
            configurable: true,
            enumerable: true,
            writable: true
        })
    }

    update(o: object | undefined) {

        if (!!o && skWrapperChecker.isObject(o)) {

            for (let key of Object.keys(o)) {
    
                this.put(key, o[key])
            }
        }
    }
    
    [Symbol.iterator](): Iterator<Array<[string, any]>> {

        let continuous: Iterator<Array<[string, any]>>

        let map: Array<[string, any]>

        let index: number
        let size: number

        map = Object.entries(this)

        index = 0

        size = map.length || 0
        size = size

        continuous = {

            next: (...args): IteratorResult<Array<[string, any]>, any> => {

                let result: IteratorResult<any>

                if (index < size) {

                    result = {
                        
                        value: map.at(index) || new Map,
                        done: false
                    }

                    index += 1
                
                } else {

                    result = {
    
                        value: null,
                        done: true
                    }
                }

                return result
            },
            return: (value?: any): IteratorResult<Array<[string, any]>, any> => {

                let result: IteratorResult<any>

                result = {

                    value: null,
                    done: true
                }

                return result
            },
            throw: (e?: any): IteratorResult<Array<[string, any]>, any> => {

                let result: IteratorResult<any>

                result = {

                    value: null,
                    done: true
                }

                return result
            }
        }
        
        return continuous 
    }

}

export class skArrayWrapper extends Array implements IskArrayWrapper {

    constructor(o?: Array<any> | undefined) {

        super()

        if (!!o && skWrapperChecker.isArray(o)) this.update(o)
    }

    get(index: number): any {
        
        if (0 <= index && index < this.length) {

            return this.at(index)
        }

        return null
    }

    contains(value: any): boolean {
        
        return !!value && this.includes(value)
    }
    
    set(index: number, value: any): void {
        
        if (0 <= index && index < this.length) {

            Object.defineProperty(this, index, {

                value: value,
                configurable: true,
                enumerable: true,
                writable: true
            })
        }
    }

    update(o: Array<any> | undefined) {

        if (!!o && skWrapperChecker.isArray(o)) {

            for (let v of o) {

                if (!this.includes(v)) {

                    this.push(v)
                }
            }
        }
    }
}

export default class skWrapper extends Object implements IskWrapper {

    constructor() {

        super()
    }

    get Checker(): object | IskWrapperChecker {

        return skWrapperChecker
    }

    get Object(): object | IskObjectWrapper {

        return skObjectWrapper
    }

    get Array(): object | IskArrayWrapper {

        return skArrayWrapper
    }
}