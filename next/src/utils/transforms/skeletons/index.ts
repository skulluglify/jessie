interface IskWebStyleTransform {

    matrix: Array<number>
    matrix3d: Array<number>

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

    setRotateX(a: number): IskWebStyleTransform
    setRotateY(a: number): IskWebStyleTransform
    setRotateZ(a: number): IskWebStyleTransform

    setScaleX(s: number): IskWebStyleTransform
    setScaleY(s: number): IskWebStyleTransform
    setScaleZ(s: number): IskWebStyleTransform

    setSkewX(a: number): IskWebStyleTransform
    setSkewY(a: number): IskWebStyleTransform

    setTranslateX(t: number): IskWebStyleTransform
    setTranslateY(t: number): IskWebStyleTransform
    setTranslateZ(t: number): IskWebStyleTransform

    // matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())
    setMatrix(sx: number, ax: number, ay: number, sy: number, tx: number, ty: number): IskWebStyleTransform
    setMatrix3D(
        a1: number, b1: number, c1: number, d1: number,
        a2: number, b2: number, c2: number, d2: number,
        a3: number, b3: number, c3: number, d3: number,
        a4: number, b4: number, c4: number, d4: number
    ): IskWebStyleTransform
    
    setPerspective(d: number): IskWebStyleTransform
    
    setRotate(a: number): IskWebStyleTransform
    setRotate3D(x: number, y: number, z: number, a: number): IskWebStyleTransform
    
    setScale(sx: number, sy: number): IskWebStyleTransform
    setScale3D(sx: number, sy: number, sz: number): IskWebStyleTransform
    
    setSkew(ax: number, ay: number): IskWebStyleTransform
    
    setTranslate(tx: number, ty: number): IskWebStyleTransform
    setTranslate3D(tx: number, ty: number, tz: number): IskWebStyleTransform

    toString(): string
    parseString(context: string): IskWebStyleTransform

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