import { skObjectWrapper, skWrapperChecker } from "../../objects"
import "./skeletons"

export class skWebStyleTransform extends Object implements IskWebStyleTransform {

    matrix: Array<number> = [1, 0, 0, 1, 0, 0]
    matrix3d: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

    setRotateX(a: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setRotateY(a: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setRotateZ(a: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setScaleX(s: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setScaleY(s: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setScaleZ(s: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setSkewX(a: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setSkewY(a: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setTranslateX(t: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setTranslateY(t: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setTranslateZ(t: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setMatrix(sx: number, ax: number, ay: number, sy: number, tx: number, ty: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setMatrix3D(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number, a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setPerspective(d: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setRotate(a: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setRotate3D(x: number, y: number, z: number, a: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setScale(sx: number, sy: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setScale3D(sx: number, sy: number, sz: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setSkew(ax: number, ay: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }
    setTranslate(tx: number, ty: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }

    setTranslate3D(tx: number, ty: number, tz: number): IskWebStyleTransform {
        throw new Error("Method not implemented.");
    }

    get maps(): IskObjectWrapper {

        return new skObjectWrapper(Object.fromEntries([
            [ "initial", null ],
            [ "inherit", null ],
            [ "matrix", this.setMatrix.call ],
            [ "matrix3d", this.setMatrix3D.call ],
            [ "perspective", this.setPerspective.call ],
            [ "rotate", this.setRotate.call ],
            [ "rotate3d", this.setRotate3D.call ],
            [ "rotateX", this.setRotateX.call ],
            [ "rotateY", this.setRotateY.call ],
            [ "rotateZ", this.setRotateZ.call ],
            [ "scale", this.setScale.call ],
            [ "scale3d", this.setScale3D.call ],
            [ "scaleX", this.setScaleX.call ],
            [ "scaleY", this.setScaleY.call ],
            [ "scaleZ", this.setScaleZ.call ],
            [ "skew", this.setSkew.call ],
            [ "skewX", this.setSkewX.call ],
            [ "skewY", this.setSkewY.call ],
            [ "translate", this.setTranslate.call ],
            [ "translate3d", this.setTranslate3D.call ],
            [ "translateX", this.setTranslateX.call ],
            [ "translateY", this.setTranslateY.call ],
            [ "translateZ", this.setTranslateZ.call ]
        ]))
    }

    parse(context: string): IskWebStyleTransform {

        if (!!context && skWrapperChecker.isString(context)) {

            //!TODOs
            //!FIXME

            let name: string
            let params: string
            let ready: boolean
            let isfun: boolean
            let maps: IskObjectWrapper
            let keeps: Array<string>

            name = ""
            params = ""
            isfun = false
            ready = false
            maps = this.maps
            keeps = []

            for (let c of context) {

                if ([" ", "("].includes(c) || ready) {

                    if (c == "(") {

                        // check name
                        if (maps.contains(name)) {

                            isfun = true
                        }
                        keeps.push(name)
                        name = ""

                        ready = true
                        continue
                    } else
                    if (c == ")") {

                        // evaluate



                        isfun = false
                        ready = false
                        continue
                    }

                    if (ready) {

                        params += c
                    }

                    continue
                }

                name += c
            }
        }

        return this
    }
}