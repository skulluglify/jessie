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

    parse(context: string): IskWebStyleTransforms {

        if (skWrapperChecker.isString(context)) {

            let c: string
            let name: string
            let params: string
            let isfun: boolean
            let maps: IskObjectWrapper<IskObjectWrapperTypeKey, any>
            let keeps: IskArrayWrapper<string>
            let temps: IskArrayWrapper<string>
            let stringMap: IskStringMap

            c = ""
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

                if (!!name && [" ", "("].includes(c) && !isfun) {

                    check_name()
                    continue

                } else
                if (c == ")" && isfun) {

                    // evaluate
                    let args: Array<string> = params.split(",").map((e: string) => e.trim())

                    let transforms: Function | null = maps.get(keeps.end())

                    if (!!transforms) transforms.bind(this)(...args)
                    
                    isfun = false
                    params = ""
                    continue

                } else
                if (isfun) {

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
}

// toString