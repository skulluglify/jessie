import { skArrayWrapper, skObjectWrapper, skWrapperChecker } from "../../objects"
import { skStringMap } from "../../strings"
import "./skeletons"

export class skWebStyleTransforms extends Object implements IskWebStyleTransforms {

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

    setRotateX(a: number): IskWebStyleTransforms {
        
        this.rotateX = a
        
        return this
    }
    setRotateY(a: number): IskWebStyleTransforms {
        
        this.rotateY = a
        
        return this
    }
    setRotateZ(a: number): IskWebStyleTransforms {
        
        this.rotateZ = a
        
        return this
    }
    setScaleX(s: number): IskWebStyleTransforms {
        
        this.scaleX = s
        
        return this
    }
    setScaleY(s: number): IskWebStyleTransforms {
        
        this.scaleY = s
        
        return this
    }
    setScaleZ(s: number): IskWebStyleTransforms {
        
        this.scaleZ = s
        
        return this
    }
    setSkewX(a: number): IskWebStyleTransforms {
        
        this.skewX = a
        
        return this
    }
    setSkewY(a: number): IskWebStyleTransforms {
        
        this.skewY = a
        
        return this
    }
    setTranslateX(t: number): IskWebStyleTransforms {
        
        this.translateX = t
        
        return this
    }
    setTranslateY(t: number): IskWebStyleTransforms {
        
        this.translateY = t
        
        return this
    }
    setTranslateZ(t: number): IskWebStyleTransforms {
        
        this.translateZ = t
        
        return this
    }
    setMatrix(sx: number, ax: number, ay: number, sy: number, tx: number, ty: number): IskWebStyleTransforms {
        
        this.matrix.set(0, sx)
        this.matrix.set(1, ax)
        this.matrix.set(2, ay)
        this.matrix.set(3, sy)
        this.matrix.set(4, tx)
        this.matrix.set(5, ty)
        
        return this
    }
    setMatrix3D(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): IskWebStyleTransforms {
        
        this.matrix3d.set(0, a1)
        this.matrix3d.set(1, b1)
        this.matrix3d.set(2, c1)
        this.matrix3d.set(3, d1)

        this.matrix3d.set(4, a2)
        this.matrix3d.set(5, b2)
        this.matrix3d.set(6, c2)
        this.matrix3d.set(7, d2)

        this.matrix3d.set(8, a3)
        this.matrix3d.set(9, b3)
        this.matrix3d.set(10, c3)
        this.matrix3d.set(11, d3)

        this.matrix3d.set(12, a4)
        this.matrix3d.set(13, b4)
        this.matrix3d.set(14, c4)
        this.matrix3d.set(15, d4)

        return this
    }
    setPerspective(d: number): IskWebStyleTransforms {
        
        this.perspective = d
        
        return this
    }
    setRotate(a: number): IskWebStyleTransforms {
        
        // rotate like rotateZ

        this.rotateZ = a
        
        return this
    }
    setRotate3D(x: number, y: number, z: number, a: number): IskWebStyleTransforms {
        
        this.rotate3d.set(0, x)
        this.rotate3d.set(1, y)
        this.rotate3d.set(2, z)
        this.rotate3d.set(3, a)

        return this
    }
    setScale(sx: number, sy: number): IskWebStyleTransforms {
        
        this.scaleX = sx
        this.scaleY = sy

        return this
    }
    setScale3D(sx: number, sy: number, sz: number): IskWebStyleTransforms {
        
        this.scaleX = sx
        this.scaleY = sy
        this.scaleZ = sz

        return this
    }
    setSkew(ax: number, ay: number): IskWebStyleTransforms {
        
        this.skewX = ax
        this.skewY = ay

        return this
    }
    setTranslate(tx: number, ty: number): IskWebStyleTransforms {
        
        this.translateX = tx
        this.translateY = ty

        return this
    }

    setTranslate3D(tx: number, ty: number, tz: number): IskWebStyleTransforms {
        
        this.translateX = tx
        this.translateY = ty
        this.translateZ = tz

        return this
    }

    get maps(): IskObjectWrapper<string | symbol, any> {

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
            let maps: IskObjectWrapper<IskObjectWrapperTypeKey, any>
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
                    let args: Array<string> = params.split(",").map((e: string) => e.trim())

                    let transforms: Function | null = maps.get(keeps.end())

                    if (!!transforms) transforms.bind(this)(...args)

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

        context = ""
        transforms = new skArrayWrapper
        temps = []

        // matrix3d > matrix

        if (!this.matrix3d.equals([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {

            context += "matrix3d"
            context += "("
            context += this.matrix3d.join(",")
            context += ")"

            transforms.push(context)
            context = ""
        } else {

            if (!this.matrix.equals([1, 0, 0, 1, 0, 0])) {
                
                context += "matrix"
                context += "("
                context += this.matrix.join(",")
                context += ")"

                transforms.push(context)
                context = ""
            }
        }

        // rotate3d > rotate

        if (!this.rotate3d.equals([0, 0, 0, 0])) {

            context += "rotate3d"
            context += "("
            context += this.rotate3d.join(",")
            context += ")"

            transforms.push(context)
            context = ""
        } else {

            if (this.rotateX != 0) {

                context += "rotateX"
                context += "("
                context += this.rotateX
                context += ")"

                transforms.push(context)
                context = ""
            }
            if (this.rotateY != 0) {

                context += "rotateY"
                context += "("
                context += this.rotateY
                context += ")"

                transforms.push(context)
                context = ""
            }

            if (this.rotateX == 0 || this.rotateY == 0) {
                
                if (this.rotateZ != 0) {
    
                    context += "rotate"
                    context += "("
                    context += this.rotateZ
                    context += ")"
    
                    transforms.push(context)
                    context = ""
                }

            } else {

                if (this.rotateZ != 0) {
    
                    context += "rotateZ"
                    context += "("
                    context += this.rotateZ
                    context += ")"
    
                    transforms.push(context)
                    context = ""
                }
            }
        }

        if (this.perspective != 0) {

            context += "perspective"
            context += "("
            context += this.perspective
            context += ")"

            transforms.push(context)
            context = ""
        }

        // scaleX scaleY scaleZ

        // scale3d
        if (this.scaleX != 1 && this.scaleY != 1) {

            if (this.scaleZ != 1) {

                temps = [

                    this.scaleX,
                    this.scaleY,
                    this.scaleZ,
                ]

                context += "scale3d"
                context += "("
                context += temps.join(",")
                context += ")"
    
                transforms.push(context)
                context = ""
            } else {

                temps = [

                    this.scaleX,
                    this.scaleY,
                ]

                context += "scale"
                context += "("
                context += temps.join(",")
                context += ")"
    
                transforms.push(context)
                context = ""
            }
        } else {

            if (this.scaleX != 1) {

                context += "scaleX"
                context += "("
                context += this.scaleX
                context += ")"
    
                transforms.push(context)
                context = ""
            }

            if (this.scaleY != 1) {

                context += "scaleY"
                context += "("
                context += this.scaleY
                context += ")"
    
                transforms.push(context)
                context = ""
            }

            if (this.scaleZ != 1) {

                context += "scaleZ"
                context += "("
                context += this.scaleZ
                context += ")"
    
                transforms.push(context)
                context = ""
            }
    
        }

        if (this.skewX != 0 && this.skewY != 0) {

            temps = [

                this.skewX,
                this.skewY,
            ]

            context += "skew"
            context += "("
            context += temps.join(",")
            context += ")"

            transforms.push(context)
            context = ""
        } else {

            if (this.skewX != 0) {

                context += "skewX"
                context += "("
                context += this.skewX
                context += ")"
    
                transforms.push(context)
                context = ""
            }

            if (this.skewY != 0) {

                context += "skewY"
                context += "("
                context += this.skewY
                context += ")"
    
                transforms.push(context)
                context = ""
            }
        }

        // translate3d
        if (this.translateX != 0 && this.translateY != 0) {

            if (this.translateZ != 0) {

                temps = [

                    this.translateX,
                    this.translateY,
                    this.translateZ,
                ]

                context += "translate3d"
                context += "("
                context += temps.join(",")
                context += ")"
    
                transforms.push(context)
                context = ""
            } else {

                temps = [

                    this.translateX,
                    this.translateY,
                ]

                context += "translate"
                context += "("
                context += temps.join(",")
                context += ")"
    
                transforms.push(context)
                context = ""
            }
        } else {

            if (this.translateX != 0) {

                context += "translateX"
                context += "("
                context += this.translateX
                context += ")"
    
                transforms.push(context)
                context = ""
            }

            if (this.translateY != 0) {

                context += "translateY"
                context += "("
                context += this.translateY
                context += ")"
    
                transforms.push(context)
                context = ""
            }

            if (this.translateZ != 0) {

                context += "translateZ"
                context += "("
                context += this.translateZ
                context += ")"
    
                transforms.push(context)
                context = ""
            }
    
        }

        return transforms.length > 0 ? transforms.join(" ") : "none"
    }
}

// toString