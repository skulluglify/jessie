import { skArrayWrapper, skObjectWrapper, skWrapperChecker } from "../../objects"
import { skStringMap } from "../../strings"
import "./skeletons"

export enum WebStyleTransformsLevel {

    NONE,
    MATRIX,
    MATRIX_3D,
    PERSPECTIVE,
    ROTATE_X,
    ROTATE_Y,
    ROTATE_Z,
    ROTATE_3D,
    SCALE_X,
    SCALE_Y,
    SCALE_Z,
    SKEW_X,
    SKEW_Y,
    TRANSLATE_X,
    TRANSLATE_Y,
    TRANSLATE_Z
}

export enum WebStyleTransformsImplLevel {

    NONE,
    MATRIX,
    PERSPECTIVE,
    ROTATE,
    SCALE,
    SKEW,
    TRANSLATE
}

class skWebStyleTransformsImpl extends Object {

    constructor() {

        super()
    }

    static getImplLevel(level?: WebStyleTransformsLevel): WebStyleTransformsImplLevel {

        if (!!level) {

            return this.isMatrix(level) ||
            this.isPerspective(level) ||
            this.isRotate(level) ||
            this.isScale(level) ||
            this.isSkew(level) ||
            this.isTranslate(level) ||
            WebStyleTransformsImplLevel.NONE
        }

        return WebStyleTransformsImplLevel.NONE
    }

    static isMatrix(level: WebStyleTransformsLevel): WebStyleTransformsImplLevel | null {

        switch (level) {

            case WebStyleTransformsLevel.MATRIX:

                return WebStyleTransformsImplLevel.MATRIX

            case WebStyleTransformsLevel.MATRIX_3D:

                return WebStyleTransformsImplLevel.MATRIX

            default:

                return null

        }
    }

    static isPerspective(level: WebStyleTransformsLevel): WebStyleTransformsImplLevel | null {

        switch (level) {

            case WebStyleTransformsLevel.PERSPECTIVE:

                return WebStyleTransformsImplLevel.PERSPECTIVE

            default:

                return null

        }
    }

    static isRotate(level: WebStyleTransformsLevel): WebStyleTransformsImplLevel | null {

        switch (level) {

            case WebStyleTransformsLevel.ROTATE_X:

                return WebStyleTransformsImplLevel.ROTATE

            case WebStyleTransformsLevel.ROTATE_Y:

                return WebStyleTransformsImplLevel.ROTATE

            case WebStyleTransformsLevel.ROTATE_Z:

                return WebStyleTransformsImplLevel.ROTATE

            case WebStyleTransformsLevel.ROTATE_3D:

                return WebStyleTransformsImplLevel.ROTATE

            default:

                return null

        }
    }

    static isScale(level: WebStyleTransformsLevel): WebStyleTransformsImplLevel | null {

        switch (level) {

            case WebStyleTransformsLevel.SCALE_X:

                return WebStyleTransformsImplLevel.SCALE

            case WebStyleTransformsLevel.SCALE_Y:

                return WebStyleTransformsImplLevel.SCALE

            default:

                return null

        }
    }

    static isSkew(level: WebStyleTransformsLevel): WebStyleTransformsImplLevel | null {

        switch (level) {

            case WebStyleTransformsLevel.SKEW_X:

                return WebStyleTransformsImplLevel.SKEW

            case WebStyleTransformsLevel.SKEW_Y:

                return WebStyleTransformsImplLevel.SKEW

            default:

                return null

        }
    }

    static isTranslate(level: WebStyleTransformsLevel): WebStyleTransformsImplLevel | null {

        switch (level) {

            case WebStyleTransformsLevel.TRANSLATE_X:

                return WebStyleTransformsImplLevel.TRANSLATE

            case WebStyleTransformsLevel.TRANSLATE_Y:

                return WebStyleTransformsImplLevel.TRANSLATE

            default:

                return null

        }
    }
}

export class skWebStyleTransforms extends Object implements IskWebStyleTransforms {

    ruleLevels: IskArrayWrapper<WebStyleTransformsLevel> = new skArrayWrapper()

    matrix: IskArrayWrapper<number> = new skArrayWrapper([1, 0, 0, 1, 0, 0])
    matrix3d: IskArrayWrapper<number> = new skArrayWrapper([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    rotate3d: IskArrayWrapper<number> = new skArrayWrapper([0, 0, 0, 0])
    
    perspective: number = 0
    
    rotateX: number = 0
    rotateY: number = 0
    rotateZ: number = 0
    scaleX: number = 1
    
    scaleY: number = 1
    scaleZ: number = 1
    
    skewX: number = 0
    skewY: number = 0
    
    translateX: number = 0
    translateY: number = 0
    translateZ: number = 0

    constructor() {

        super()
    }

    //?features
    // getRotateX
    // setRotateX
    // delRotateX
    
    setRotateX(a: number): IskWebStyleTransforms {
        
        this.rotateX = a

        this.ruleLevels.update([
            WebStyleTransformsLevel.ROTATE_X
        ])
        
        return this
    }

    setRotateY(a: number): IskWebStyleTransforms {
        
        this.rotateY = a

        this.ruleLevels.update([
            WebStyleTransformsLevel.ROTATE_Y
        ])
        
        return this
    }
    
    setRotateZ(a: number): IskWebStyleTransforms {
        
        this.rotateZ = a

        this.ruleLevels.update([
            WebStyleTransformsLevel.ROTATE_Z
        ])
        
        return this
    }

    setScaleX(s: number): IskWebStyleTransforms {
        
        this.scaleX = s

        this.ruleLevels.update([
            WebStyleTransformsLevel.SCALE_X
        ])
        
        return this
    }

    setScaleY(s: number): IskWebStyleTransforms {
        
        this.scaleY = s

        this.ruleLevels.update([
            WebStyleTransformsLevel.SCALE_Y
        ])
        
        return this
    }

    setScaleZ(s: number): IskWebStyleTransforms {
        
        this.scaleZ = s

        this.ruleLevels.update([
            WebStyleTransformsLevel.SCALE_Z
        ])
        
        return this
    }

    setSkewX(a: number): IskWebStyleTransforms {
        
        this.skewX = a

        this.ruleLevels.update([
            WebStyleTransformsLevel.SKEW_X
        ])
        
        return this
    }

    setSkewY(a: number): IskWebStyleTransforms {
        
        this.skewY = a

        this.ruleLevels.update([
            WebStyleTransformsLevel.SKEW_Y
        ])
        
        return this
    }

    setTranslateX(t: number): IskWebStyleTransforms {
        
        this.translateX = t

        this.ruleLevels.update([
            WebStyleTransformsLevel.TRANSLATE_X
        ])
        
        return this
    }

    setTranslateY(t: number): IskWebStyleTransforms {
        
        this.translateY = t

        this.ruleLevels.update([
            WebStyleTransformsLevel.TRANSLATE_Y
        ])
        
        return this
    }

    setTranslateZ(t: number): IskWebStyleTransforms {
        
        this.translateZ = t

        this.ruleLevels.update([
            WebStyleTransformsLevel.TRANSLATE_Z
        ])
        
        return this
    }

    setMatrix(sx: number, ax: number, ay: number, sy: number, tx: number, ty: number): IskWebStyleTransforms {
        
        if (!!sx) this.matrix.set(0, sx)
        if (!!ax) this.matrix.set(1, ax)
        if (!!ay) this.matrix.set(2, ay)
        if (!!sy) this.matrix.set(3, sy)
        if (!!tx) this.matrix.set(4, tx)
        if (!!ty) this.matrix.set(5, ty)

        this.ruleLevels.update([
            WebStyleTransformsLevel.MATRIX
        ])
        
        return this
    }

    setMatrix3D(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): IskWebStyleTransforms {
        
        if (!!a1) this.matrix3d.set(0, a1)
        if (!!b1) this.matrix3d.set(1, b1)
        if (!!c1) this.matrix3d.set(2, c1)
        if (!!d1) this.matrix3d.set(3, d1)
        if (!!a2) this.matrix3d.set(4, a2)
        if (!!b2) this.matrix3d.set(5, b2)
        if (!!c2) this.matrix3d.set(6, c2)
        if (!!d2) this.matrix3d.set(7, d2)
        if (!!a3) this.matrix3d.set(8, a3)
        if (!!b3) this.matrix3d.set(9, b3)
        if (!!c3) this.matrix3d.set(10, c3)
        if (!!d3) this.matrix3d.set(11, d3)
        if (!!a4) this.matrix3d.set(12, a4)
        if (!!b4) this.matrix3d.set(13, b4)
        if (!!c4) this.matrix3d.set(14, c4)
        if (!!d4) this.matrix3d.set(15, d4)

        this.ruleLevels.update([
            WebStyleTransformsLevel.MATRIX_3D
        ])

        return this
    }

    setPerspective(d: number): IskWebStyleTransforms {
        
        this.perspective = d

        this.ruleLevels.update([
            WebStyleTransformsLevel.PERSPECTIVE
        ])
        
        return this
    }

    setRotate(a: number): IskWebStyleTransforms {
        
        // rotate like rotateZ

        this.rotateZ = a

        this.ruleLevels.update([
            WebStyleTransformsLevel.ROTATE_Z
        ])
        
        return this
    }

    setRotate3D(x: number, y: number, z: number, a: number): IskWebStyleTransforms {
        
        if (!!x) this.rotate3d.set(0, x)
        if (!!y) this.rotate3d.set(1, y)
        if (!!z) this.rotate3d.set(2, z)
        if (!!a) this.rotate3d.set(3, a)

        this.ruleLevels.update([
            WebStyleTransformsLevel.ROTATE_3D
        ])

        return this
    }

    setScale(sx: number, sy: number): IskWebStyleTransforms {
        
        if (!!sx) this.scaleX = sx
        if (!!sy) this.scaleY = sy

        this.ruleLevels.update([
            WebStyleTransformsLevel.SCALE_X,
            WebStyleTransformsLevel.SCALE_Y
        ])

        return this
    }

    setScale3D(sx: number, sy: number, sz: number): IskWebStyleTransforms {
        
        if (!!sx) this.scaleX = sx
        if (!!sy) this.scaleY = sy
        if (!!sz) this.scaleZ = sz

        this.ruleLevels.update([
            WebStyleTransformsLevel.SCALE_X,
            WebStyleTransformsLevel.SCALE_Y,
            WebStyleTransformsLevel.SCALE_Z
        ])

        return this
    }

    setSkew(ax: number, ay: number): IskWebStyleTransforms {
        
        if (!!ax) this.skewX = ax
        if (!!ay) this.skewY = ay

        this.ruleLevels.update([
            WebStyleTransformsLevel.SKEW_X,
            WebStyleTransformsLevel.SKEW_Y
        ])

        return this
    }

    setTranslate(tx: number, ty: number): IskWebStyleTransforms {
        
        if (!!tx) this.translateX = tx
        if (!!ty) this.translateY = ty

        this.ruleLevels.update([
            WebStyleTransformsLevel.TRANSLATE_X,
            WebStyleTransformsLevel.TRANSLATE_Y
        ])

        return this
    }

    setTranslate3D(tx: number, ty: number, tz: number): IskWebStyleTransforms {
        
        if (!!tx) this.translateX = tx
        if (!!ty) this.translateY = ty
        if (!!tz) this.translateZ = tz

        this.ruleLevels.update([
            WebStyleTransformsLevel.TRANSLATE_X,
            WebStyleTransformsLevel.TRANSLATE_Y,
            WebStyleTransformsLevel.TRANSLATE_Z
        ])

        return this
    }

    get maps(): IskObjectWrapper<any> {

        return new skObjectWrapper(Object.fromEntries([
            [ "none", null ],
            [ "initial", null ],
            [ "inherit", null ],
            [ "matrix", this.setMatrix ],
            [ "matrix3d", this.setMatrix3D ],
            [ "perspective", this.setPerspective ],
            [ "rotate", this.setRotate ],
            [ "rotate3d", this.setRotate3D ],
            [ "rotateX", this.setRotateX ],
            [ "rotateY", this.setRotateY ],
            [ "rotateZ", this.setRotateZ ],
            [ "scale", this.setScale ],
            [ "scale3d", this.setScale3D ],
            [ "scaleX", this.setScaleX ],
            [ "scaleY", this.setScaleY ],
            [ "scaleZ", this.setScaleZ ],
            [ "skew", this.setSkew ],
            [ "skewX", this.setSkewX ],
            [ "skewY", this.setSkewY ],
            [ "translate", this.setTranslate ],
            [ "translate3d", this.setTranslate3D ],
            [ "translateX", this.setTranslateX ],
            [ "translateY", this.setTranslateY ],
            [ "translateZ", this.setTranslateZ ]
        ]))
    }

    clear(): void {

        this.ruleLevels.stack([])
        this.matrix.stack([1, 0, 0, 1, 0, 0])
        this.matrix3d.stack([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        this.rotate3d.stack([0, 0, 0, 0])
        this.perspective = 0
        this.rotateX = 0
        this.rotateY = 0
        this.rotateZ = 0
        this.scaleX = 1
        this.scaleY = 1
        this.scaleZ = 1
        this.skewX = 0
        this.skewY = 0
        this.translateX = 0
        this.translateY = 0
        this.translateZ = 0
    }

    parse(context: string): IskWebStyleTransforms {

        this.clear()

        if (skWrapperChecker.isString(context)) {

            let c: string
            let r: number
            let name: string
            let params: string
            let isfun: boolean
            let maps: IskObjectWrapper<any>
            let keeps: IskArrayWrapper<string>
            let temps: IskArrayWrapper<string>
            let stringMap: IskStringMap

            c = ""
            r = 0
            name = ""
            params = ""
            isfun = false
            maps = this.maps
            keeps = new skArrayWrapper
            temps = new skArrayWrapper(Array.from(context))
            stringMap = new skStringMap

            let check_name = (): void => {

                // check name
                if (maps.contains(name)) {

                    if (skWrapperChecker.isFunction(maps.get(name))) {

                        isfun = true
                    
                    }
                    
                    keeps.push(name)

                } else {

                    console.warn(`WebStyleTransforms not found property of ${name}!`)
                }

                name = ""
            }

            for (let c of context) {

                if (!!name && [" ", "("].includes(c) && !isfun && r == 0) {

                    check_name()
                    continue

                } else
                if (c == ")" && isfun && r == 0) {

                    //!BUGS
                    // from matrix(12,f(12px,6px),12,20,2,4)
                    // to matrix(12,f(12px,6px),12,20,2)
                    // evaluate

                    // make parse independent
                    let args: Array<string> = params.split(",").map((e: string) => e.trim())

                    let def_name: string | null = keeps.end()

                    if (!!def_name) {

                        if (skWrapperChecker.isString(def_name)) {
        
                            let transforms: Function | null = maps.get(def_name)
        
                            if (!!transforms) transforms.bind(this)(...args)
                        }
                    }

                    isfun = false
                    params = ""
                    continue

                } else
                if (isfun) {

                    if (c == "(") {
                        
                        r = r + 1
                    
                    } else
                    if (c == ")") {

                        r = r > 0 ? r - 1 : 0

                    }

                    params += c
                    continue

                } else {

                    if (stringMap.alphabet.includes(c)) {

                        name += c
                    }
                }
                
            }

            if (!!name) check_name()
        }

        return this
    }

    toString(): string {

        let context: string
        let transforms: IskArrayWrapper<string>
        let temps: Array<string | number>
        let ruleMaps: Array<[WebStyleTransformsImplLevel, Function]>

        context = ""
        transforms = new skArrayWrapper
        temps = []

        let matrix: IskArrayWrapper<number> = this.matrix
        let matrix3d: IskArrayWrapper<number> = this.matrix3d
        let rotate3d: IskArrayWrapper<number> = this.rotate3d
        let perspective: number = this.perspective
        let rotateX: number = this.rotateX
        let rotateY: number = this.rotateY
        let rotateZ: number = this.rotateZ
        let scaleX: number = this.scaleX
        let scaleY: number = this.scaleY
        let scaleZ: number = this.scaleZ
        let skewX: number = this.skewX
        let skewY: number = this.skewY
        let translateX: number = this.translateX
        let translateY: number = this.translateY
        let translateZ: number = this.translateZ


        ruleMaps = [

            [
                WebStyleTransformsImplLevel.MATRIX,
                (function __matrix__() {

                    // matrix3d > matrix
    
                    if (!matrix3d.equals([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
    
                        context += "matrix3d"
                        context += "("
                        context += matrix3d.join(",")
                        context += ")"
    
                        transforms.push(context)
                        context = ""
                    } else {
    
                        if (!matrix.equals([1, 0, 0, 1, 0, 0])) {
                            
                            context += "matrix"
                            context += "("
                            context += matrix.join(",")
                            context += ")"
    
                            transforms.push(context)
                            context = ""
                        }
                    }
                })
            ],
            [
                WebStyleTransformsImplLevel.ROTATE,
                (function __rotate__() {

                    // rotate3d > rotate
    
                    if (!rotate3d.equals([0, 0, 0, 0])) {
    
                        context += "rotate3d"
                        context += "("
                        context += rotate3d.join(",")
                        context += ")"
    
                        transforms.push(context)
                        context = ""
                    } else {
    
                        if (rotateX != 0) {
    
                            context += "rotateX"
                            context += "("
                            context += rotateX
                            context += ")"
    
                            transforms.push(context)
                            context = ""
                        }
                        if (rotateY != 0) {
    
                            context += "rotateY"
                            context += "("
                            context += rotateY
                            context += ")"
    
                            transforms.push(context)
                            context = ""
                        }
    
                        // we can bypass rotateZ to rotate ?
                        // because IE9 not support rotateZ, but rotate
                        if (rotateX == 0 && rotateY == 0) {
                            
                            if (rotateZ != 0) {
                
                                context += "rotate"
                                context += "("
                                context += rotateZ
                                context += ")"
                
                                transforms.push(context)
                                context = ""
                            }
    
                        } else {
    
                            if (rotateZ != 0) {
                
                                context += "rotateZ"
                                context += "("
                                context += rotateZ
                                context += ")"
                
                                transforms.push(context)
                                context = ""
                            }
                        }
                    }
                })
            ],
            [
                WebStyleTransformsImplLevel.PERSPECTIVE,
                (function __perspective__() {

                    if (perspective != 0) {
    
                        context += "perspective"
                        context += "("
                        context += perspective
                        context += ")"
            
                        transforms.push(context)
                        context = ""
                    }
                })
            ],
            [
                WebStyleTransformsImplLevel.SCALE,
                (function __scale__() {

                    // scale3d
                    // scaleX scaleY scaleZ
                    if (scaleX != 1 && scaleY != 1) {
    
                        if (scaleZ != 1) {
    
                            temps = [
    
                                scaleX,
                                scaleY,
                                scaleZ,
                            ]
    
                            context += "scale3d"
                            context += "("
                            context += temps.join(",")
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        } else {
    
                            temps = [
    
                                scaleX,
                                scaleY,
                            ]
    
                            context += "scale"
                            context += "("
                            context += temps.join(",")
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
                    } else {
    
                        if (scaleX != 1) {
    
                            context += "scaleX"
                            context += "("
                            context += scaleX
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
    
                        if (scaleY != 1) {
    
                            context += "scaleY"
                            context += "("
                            context += scaleY
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
    
                        if (scaleZ != 1) {
    
                            context += "scaleZ"
                            context += "("
                            context += scaleZ
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
                
                    }
                })
            ],
            [
                WebStyleTransformsImplLevel.SKEW,
                (function __skew__() {

                    if (skewX != 0 && skewY != 0) {
    
                        temps = [
            
                            skewX,
                            skewY,
                        ]
            
                        context += "skew"
                        context += "("
                        context += temps.join(",")
                        context += ")"
            
                        transforms.push(context)
                        context = ""
                    } else {
            
                        if (skewX != 0) {
            
                            context += "skewX"
                            context += "("
                            context += skewX
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
            
                        if (skewY != 0) {
            
                            context += "skewY"
                            context += "("
                            context += skewY
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
                    }
                })
            ],
            [
                WebStyleTransformsImplLevel.TRANSLATE,
                (function __translate__() {

                    // translate3d
                    if (translateX != 0 && translateY != 0) {
    
                        if (translateZ != 0) {
    
                            temps = [
    
                                translateX,
                                translateY,
                                translateZ,
                            ]
    
                            context += "translate3d"
                            context += "("
                            context += temps.join(",")
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        } else {
    
                            temps = [
    
                                translateX,
                                translateY,
                            ]
    
                            context += "translate"
                            context += "("
                            context += temps.join(",")
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
                    } else {
    
                        if (translateX != 0) {
    
                            context += "translateX"
                            context += "("
                            context += translateX
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
    
                        if (translateY != 0) {
    
                            context += "translateY"
                            context += "("
                            context += translateY
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
    
                        if (translateZ != 0) {
    
                            context += "translateZ"
                            context += "("
                            context += translateZ
                            context += ")"
                
                            transforms.push(context)
                            context = ""
                        }
                
                    }
                })
            ]
        ]

        let impl: WebStyleTransformsImplLevel | null
        let implRules: Array<WebStyleTransformsImplLevel>
        implRules = []

        for (let ruleLevel of this.ruleLevels) {

            impl = skWebStyleTransformsImpl.getImplLevel(ruleLevel)

            if (!(impl == WebStyleTransformsImplLevel.NONE)) {

                if (!implRules.includes(impl)) {

                    for (let [ level, fun ] of ruleMaps) {

                        if (impl == level) {
        
                            implRules.push(level)
                            fun()
        
                            break
                        }
                    }
                }
            }
        }

        return transforms.length > 0 ? transforms.join(" ") : "none"
    }

    toRelativeString(): string {
        
        let transforms: Array<string>
        transforms = []

        /*
            MATRIX,
            MATRIX_3D,
            PERSPECTIVE,
            ROTATE_X,
            ROTATE_Y,
            ROTATE_Z,
            ROTATE_3D,
            SCALE_X,
            SCALE_Y,
            SCALE_Z,
            SKEW_X,
            SKEW_Y,
            TRANSLATE_X,
            TRANSLATE_Y,
            TRANSLATE_Z
        */

        return transforms.length > 0 ? transforms.join(" ") : "none"
    }
}

// toString
// toRelativeString
// toFixedString