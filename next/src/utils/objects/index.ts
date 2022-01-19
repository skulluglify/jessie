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

    // NUMBER TYPE
    static isNumber(o: any): boolean {

        return (!!o || "" + o == "0") && typeof o == "number"
    }

    // NUMBER TYPE
    static isNaN(o: any): boolean {

        return this.isNumber(o) && Number.isNaN(o)
    }

    // NUMBER TYPE
    static isInfinity(o: any): boolean {

        return this.isNumber(o) && !Number.isFinite(o)
    }

    // NUMBER TYPE
    static isNumeric(o: any): boolean {

        return this.isNumber(o) && !this.isNaN(o) && !this.isInfinity(o)
    }

    // DEFINE TYPE
    static isDefine(o: any): boolean {

        return (!!o || typeof o != "undefined") || this.isNumber(o)
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

    static isFunction(o: any): boolean {

        return !!o && typeof o == "function" && Function.prototype.isPrototypeOf(o)
    }

    static isMap(o: any): boolean {

        return this.isObject(o) && Map.prototype.isPrototypeOf(o)
    }

    static isSet(o: any): boolean {

        return this.isObject(o) && Set.prototype.isPrototypeOf(o)
    }
}

export class skObjectWrapper<T, U> extends Object implements IskObjectWrapper<T, U> {

    constructor(o?: object) {

        super()

        if (!!o && skWrapperChecker.isObject(o)) this.update(o)
    }

    get(key: string): any {

        let map: IskObjectWrapperTypes

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

    contains(keyOrValue: any): boolean {

        if (skWrapperChecker.isDefine(keyOrValue)) {

            for (let [ k, v ] of this) {

                if ([ k, v ].includes(keyOrValue)) {

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

    update(o: object) {

        if (skWrapperChecker.isObject(o)) {

            for (let key of Object.keys(o)) {
    
                this.put(key, o[key])
            }
        }
    }
    
    [Symbol.iterator](): Iterator<IskObjectWrapperTypes> {

        let continuous: Iterator<IskObjectWrapperTypes>

        let map: IskObjectWrapperTypes

        let index: number
        let size: number

        map = Object.entries(this)

        index = 0

        size = map.length || 0
        size = size

        continuous = {

            next: (...args): IteratorResult<IskObjectWrapperTypes, any> => {

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
            return: (value?: any): IteratorResult<IskObjectWrapperTypes, any> => {

                let result: IteratorResult<any>

                result = {

                    value: null,
                    done: true
                }

                return result
            },
            throw: (e?: any): IteratorResult<IskObjectWrapperTypes, any> => {

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

export class skArrayWrapper<T> extends Array implements IskArrayWrapper<T> {

    constructor(o?: Array<any>) {

        super()

        if (!!o && skWrapperChecker.isArray(o)) {

            this.push(...o)
        }
    }

    get(index: number): any {
        
        if (0 <= index && index < this.length) {

            return this.at(index)
        }

        return null
    }

    contains(value: any): boolean {
        
        return skWrapperChecker.isDefine(value) && this.includes(value)
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

    update(o: Array<any>) {

        if (skWrapperChecker.isArray(o)) {

            for (let v of o) {

                if (!this.includes(v)) {

                    this.push(v)
                }
            }
        }
    }

    empty(): boolean {
        
        return !(this.length > 0)
    }

    start(): any {

        return this.length > 0 ? this.get(0) : null 
    }

    end(): any {

        return this.length > 0 ? this.get(this.length - 1) : null 
    }
}

export default class skWrapper extends Object implements IskWrapper {

    constructor() {

        super()
    }

    get Checker(): object | IskWrapperChecker {

        return skWrapperChecker
    }

    get Object(): object | IskObjectWrapper<IskObjectWrapperTypeKey, any> {

        return skObjectWrapper
    }

    get Array(): object | IskArrayWrapper<any> {

        return skArrayWrapper
    }
}