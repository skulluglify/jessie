import { skStringMap } from "../strings"

function ppow(value: number, dist: number): number {

    if (dist > 0) return value * ppow(value, dist - 1)
    return 1
}

function bitwise_and(value: number, dist: number): number {

    let index: number
    let count: number
    let v: number
    let m: number
    let n: number
    index = 0
    count = 0
    v = 0
    m = 0
    n = 0

    let a: string
    let b: string
    let s: string
    let t: string
    a = ""
    b = ""
    s = ""
    t = ""

    a = bin(value)
    b = bin(dist)

    m = a.length
    n = b.length

    while (index < n) {

        v = n - index - 1
        s = b[v]

        v = m - index - 1
        t = a[v]

        if (s == t) {

            if (s == "1") {

                count = count + ppow(2, index)
            }
        }

        index = index + 1
    }

    return count
}

function bitwise_or(value: number, dist: number): number {

    let index: number
    let count: number
    let v: number
    let m: number
    let n: number
    index = 0
    count = 0
    v = 0
    m = 0
    n = 0

    let a: string
    let b: string
    let s: string
    let t: string
    a = ""
    b = ""
    s = ""
    t = ""

    a = bin(value)
    b = bin(dist)

    m = a.length
    n = b.length

    while (index < n) {

        v = n - index - 1
        s = b[v]

        v = m - index - 1
        t = a[v]

        if (s == "1" || t == "1") {

            count = count + ppow(2, index)
        }

        index = index + 1
    }

    return count
}

function bitwise_xor(value: number, dist: number): number {

    let index: number
    let count: number
    let v: number
    let m: number
    let n: number
    index = 0
    count = 0
    v = 0
    m = 0
    n = 0

    let a: string
    let b: string
    let s: string
    let t: string
    a = ""
    b = ""
    s = ""
    t = ""

    a = bin(value)
    b = bin(dist)

    m = a.length
    n = b.length

    while (index < n) {

        v = n - index - 1
        s = b[v]

        v = m - index - 1
        t = a[v]

        if (s == "1" || t == "1") {

            if (s != t) {

                count = count + ppow(2, index)
            }
        }

        index = index + 1
    }

    return count
}

function bitwise_twocomp(value: number): number {

    return - value - 1
}

function bitwise_onecomp(value: number): number {

    let context: string
    context = ""

    let index: number
    let count: number
    let m: number
    let n: number
    index = 0
    count = 0
    m = 1
    n = 0

    if (value < m) return 1
    if (value <= m) return 0
    while (m < value) {

        m = m * 2
    }
    
    if (m == value) return m - 1

    let a: string
    let t: string
    a = ""
    t = ""

    a = bin(value)

    n = a.length

    while (index < n) {

        t = a[index]

        t = t == "1" ? "0" : "1"
        context = context + t 

        index = index + 1
    }

    return binparse(context)
}

function bin(value: number): string {

    let context: string
    context = ""

    let i: number
    let k: number
    let m: number

    i = 0
    k = 1
    m = 1

    if (value < m) return "0"
    if (value <= m) return "1"

    while (m <= value) {

        k = m
        m = m * 2
        i = i + 1
    }

    i = i - 2
    value = value - k
    context = "1"

    while (0 <= i) {

        m = ppow(2, i)
        if (m <= value) {

            context = context + "1" 
            value = value - m
        
        } else {

            context = context + "0"
        }
        i = i - 1
    }

    return context
}

function decode(context: string, radix?: number): number {

    if (!radix) radix = 16 // 2, 8

    let stringMap: IskStringMap
    stringMap = new skStringMap

    let hexdigits: string
    let test: string
    hexdigits = stringMap.hexdigits
    test = ""

    let c: number
    let v: number
    let i: number
    let n: number

    c = 0
    v = 0
    i = 0
    n = 0

    n = context.length

    while (i < n) {

        v = n - i - 1
        test = context.charAt(v)

        v = hexdigits.indexOf(test)
        v = v * ppow(radix, i)

        c = c + v

        i = i + 1
    }

    return c
}

Object.defineProperty(global, "decode", {value: decode, writable: false})

function binparse(context: string): number {

    let stringMap: IskStringMap
    stringMap = new skStringMap

    let hexdigits: string
    let test: string
    hexdigits = stringMap.hexdigits
    test = ""

    let i: number
    let c: number
    let v: number
    let n: number
    i = 0
    c = 0
    v = 0
    n = context.length

    while (i < n) {

        v = n - i - 1
        test = context[v]
        
        v = hexdigits.indexOf(test)

        if (v > 0) {

            c = c + ppow(2, i)
        }

        i = i + 1
    }

    return c
}

function shlbin(value: number, dist: number): number {

    let count: number
    count = 0

    let context: string
    context = bin(value)

    let index: number
    index = 0

    while (index < dist) {

        context = context + "0"

        index = index + 1
    }

    count = binparse(context)

    return count
}

function shrbin(value: number, dist: number): number {

    let count: number
    count = 0

    let context: string
    context = bin(value)

    let index: number
    index = 0

    while (index < dist) {

        context = context.slice(0, context.length - 1)

        index = index + 1
    }

    count = binparse(context)

    return count
}

function binlen(value: number): number {

    let index: number
    let count: number
    index = 0
    count = 0

    if (value > 0) {

        while (count <= value) {

            count = count + ppow(2, index)
            index = index + 1
        }

    }

    return index && index - 1
}

function encode(value: number, radix?: number): string {

    if (!radix) radix = 16

    let context: string
    context = ""

    let stringMap: IskStringMap
    stringMap = new skStringMap

    let hexdigits: string
    hexdigits = stringMap.hexdigits

    let pos: number
    let dist: number
    let shl: number
    let index: number
    let v: number
    pos = 0
    dist = radix - 1
    shl = binlen(dist)
    index = 0
    v = 0

    while (value > 0) {

        pos = index * shl
        v = bitwise_and(shrbin(value, pos), dist)
        if (!!v) value = value - shlbin(v, pos)
        context = hexdigits[v] + context
        index = index + 1

        if (index > 200) break
    }

    return context
}

Object.defineProperty(global, "encode", {value: encode, writable: false})
Object.defineProperty(global, "bitwise_onecomp", {value: bitwise_onecomp, writable: false})
Object.defineProperty(global, "bitwise_twocomp", {value: bitwise_twocomp, writable: false})

console.log(encode(82326530277))
console.log(bin(82326530277))
console.log(binparse(bin(82326530277)))