interface IskWebStyleTransforms {

    matrix: IskArrayWrapper<number>
    matrix3d: IskArrayWrapper<number>
    rotate3d: IskArrayWrapper<number>

    perspective: number

    rotateX: number
    rotateY: number
    rotateZ: number

    scaleX: number
    scaleY: number
    scaleZ: number

    skewX: number
    skewY: number

    translateX: number
    translateY: number
    translateZ: number

    constructor: Function

    clear(): void

    setRotateX(a: number): IskWebStyleTransforms
    setRotateY(a: number): IskWebStyleTransforms
    setRotateZ(a: number): IskWebStyleTransforms

    setScaleX(s: number): IskWebStyleTransforms
    setScaleY(s: number): IskWebStyleTransforms
    setScaleZ(s: number): IskWebStyleTransforms

    setSkewX(a: number): IskWebStyleTransforms
    setSkewY(a: number): IskWebStyleTransforms

    setTranslateX(t: number): IskWebStyleTransforms
    setTranslateY(t: number): IskWebStyleTransforms
    setTranslateZ(t: number): IskWebStyleTransforms

    // matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())
    setMatrix(sx: number, ax: number, ay: number, sy: number, tx: number, ty: number): IskWebStyleTransforms
    setMatrix3D(
        a1: number, b1: number, c1: number, d1: number,
        a2: number, b2: number, c2: number, d2: number,
        a3: number, b3: number, c3: number, d3: number,
        a4: number, b4: number, c4: number, d4: number
    ): IskWebStyleTransforms
    
    setPerspective(d: number): IskWebStyleTransforms
    
    setRotate(a: number): IskWebStyleTransforms
    setRotate3D(x: number, y: number, z: number, a: number): IskWebStyleTransforms
    
    setScale(sx: number, sy: number): IskWebStyleTransforms
    setScale3D(sx: number, sy: number, sz: number): IskWebStyleTransforms
    
    setSkew(ax: number, ay: number): IskWebStyleTransforms
    
    setTranslate(tx: number, ty: number): IskWebStyleTransforms
    setTranslate3D(tx: number, ty: number, tz: number): IskWebStyleTransforms

    get maps(): IskObjectWrapper<any>
    parse(context: string): IskWebStyleTransforms
    
    toString(): string
    toRelativeString(): string

    /*
    matrix()
    matrix3d()
    perspective()
    rotate()
    rotate3d()
    rotateX()
    rotateY()
    rotateZ()
    scale()
    scale3d()
    scaleX()
    scaleY()
    scaleZ()
    skew()
    skewX()
    skewY()
    translate()
    translate3d()
    translateX()
    translateY()
    translateZ()
    ["matrix","matrix3d","perspective","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"]
    [
        [ "matrix", setMatrix ],
        [ "matrix3d", setMatrix3D ],
        [ "perspective", setPerspective ],
        [ "rotate", setRotate ],
        [ "rotate3d", setRotate3D ],
        [ "rotateX", setRotateX ],
        [ "rotateY", setRotateY ],
        [ "rotateZ", setRotateZ ],
        [ "scale", setScale ],
        [ "scale3d", setScale3D ],
        [ "scaleX", setScaleX ],
        [ "scaleY", setScaleY ],
        [ "scaleZ", setScaleZ ],
        [ "skew", setSkew ],
        [ "skewX", setSkewX ],
        [ "skewY", setSkewY ],
        [ "translate", setTranslate ],
        [ "translate3d", setTranslate3D ],
        [ "translateX", setTranslateX ],
        [ "translateY", setTranslateY ],
        [ "translateZ", setTranslateZ ]
    ]
    */
}