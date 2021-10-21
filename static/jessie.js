/*
    sk: skulluglify
*/

export class skQueryEvent extends Event {

    constructor () {

        super("Query");

        this.detail = new Object;
        
    }
}

export class skQueryReadyEvent extends Event {

    constructor () {

        super("QueryReady");

        this.detail = new Object;
        
    }
}

export class DOMTokenListTrace extends Array {

    constructor () {

        super();

    }

    add(...tokens) {}
    remove(...tokens) {}
    contains(token) {}
    entries() { arguments } // Array Iterator
    get value() {}
}

export class ElementTrace extends Object {
    
    constructor () {
        
        super();

        this.classList = new DOMTokenListTrace;
    
    }

    setAttribute() {}
    getAttribute() {}

}

export class skQuery extends EventTarget {

    constructor (target = null) {

        super();

        this.target = target;
        this.event = new skQueryEvent;
        this.uuid = this.GENERATE_RAND_UUID;

        this.dispatchEvent(this.event);
    }

    get GENERATE_RAND_UUID() {
        return "10000000-1000-1000-1000-100000000000".replace(/[0|1]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    isArray(obj) {
        return !!(obj && typeof obj == "object" && (typeof obj?.length == "number") && (!"isArray" in Array ? Array.prototype.isPrototypeOf(obj) : Array.isArray(obj)));
    }

    isRegex(obj) {
        return !!(obj && typeof obj == "object" && RegExp.prototype.isPrototypeOf(obj));
    }

    onceCall(fn, context) {
        let returns;
        return function() {
            if (fn) {
                returns = fn.apply(this || context, arguments);
                fn = null;
            }
            return returns;
        }
    }

    readyState(fn, context) {
        let returns;
        return function() {
            if (fn && document.readyState == "complete") {
                returns = fn.apply(this || context, arguments);
                fn = null;
            }
            return returns;
        }
    }

    unSpaceText (context) {
        
        let puts, caches, n, start;
        n = context?.length || 0;
        start = false;
        caches = "";

        for (let i = 0; i < n; i++) {
            puts = context[i];
            if (puts == " " && !start) continue;
            caches += puts;
            start = true;
        }

        n = caches.length;
        start = false;
        context = "";

        if (caches[n -1] != " ") return caches;

        for (let i = 0; i < n; i++) {
            puts = caches[n -1 -i];
            if (puts == " " && !start) continue;
            context = puts + context;
            start = true;
        }

        return context;
    }

    // ex: q.unQuote("name=\"ahmad asy syafiq\"&class=\"devil\"", [ /\&/i, "=" ])
    unQuote(context, options = null, separate = !1, keepquotes = !1) {
        let caches, contexts, end, isregex, quotes, slashkeys, cacheQueue;
 
        caches = "";
        contexts = new Array;
        end = "";
        isregex = this.isRegex(options);
        quotes = "";
        slashkeys = !1;
        cacheQueue = new Array;

        if (this.isArray(options)) {

            end = options[options.length - 1];
            for (let option of options) {
                if (contexts.length == 0) {
                    contexts = this.unQuote(context, option, !0, !0)
                    continue;
                }
                for (let context of contexts) {
                    if (end != option) {
                        for (let cache of this.unQuote(context, option, !0, !0)) {
                            cacheQueue.push(cache);
                        }
                    } else {
                        cacheQueue.push(this.unQuote(context, option, !0, !1));
                    }
                }
                contexts = cacheQueue;
                cacheQueue = new Array;
            }

            // for (let i = 0; i < contexts.length; i++) {
            //     cacheQueue.push([contexts[i], this.unQuote(contexts[i+1])]);
            //     i++;
            // }

            // contexts = cacheQueue;
            // cacheQueue = new Array;

            return contexts;
        }

        for (let puts of context) {

            if (slashkeys) {
                caches += puts;
                slashkeys = !1;
                continue;
            };
            
            
            if (puts == "\\") {
                slashkeys = !0;
                if (!keepquotes) continue;
            }
            
            if (quotes.length < 2) {
                
                if ("\'\"".includes(puts) && (quotes.length > 0 ? quotes[0] == puts : true) && !slashkeys) {
                    if (keepquotes) caches += puts;
                    quotes += puts;
                    continue;
                }
            
            } else {
                
                if (caches.length > 0) contexts.push(caches);
                caches = "";
                quotes = "";
                
            }

            
            if (quotes.length == 0) {
                if (separate && (!isregex ? options == puts : options.test(puts))) {
                    
                    if (caches.length > 0) contexts.push(caches);
                    caches = "";
                    
                    continue;
                    
                }
            }
            
            caches += puts;
        }

        
        if (caches.length > 0) contexts.push(caches);
 
        if (separate) return contexts;
        return contexts[0];
    }

    hex(value) {
        
        let context, caches;
        context = "0123456789abcdef";
        caches = [];

        if (value && typeof value == "string") {
            for (let puts of value) {
                caches.push(this.hex(puts.codePointAt()));
            }
            return caches;
        }

        if (typeof value != "number" || isNaN(value)) return "";

        let i, maxint, b, c, d, n;

        maxint = 256;
        
        i = 0;
        b = 0;
        c = 0;
        d = 0;
        n = 0;
        
        while (maxint < value) {
            maxint += maxint;
            i++;
        }

        if (i%2) {

            n = maxint / 2;
            b = n ** 0.5;
            
            while (d < b) {
                d += 2 ** c;
                c++;
            }
            
            return this.hex(value >> ((c -1) * 2)) + this.hex(value & (n - 1));
        
        } else {
            
            b = maxint ** 0.5;
            
            while (d < b) {
                d += 2 ** c;
                c++;
            }
            
            if (value > 255) return this.hex(value >> (c -1)) + this.hex(value & (b - 1));
            
            return context[value >> (c -1)] + context[value & (b - 1)];
        
        }
    }

    urlSearchStringify(obj) {
        let context = "?";
        if (typeof obj == "object") {
            for (let key in obj) {
                context += `${key}=${obj[key]}&`;
            }
        }
        return context.slice(0, context.length -1).replaceAll(" ", "+");
    }

    parseUrlSearch (urls) {
        let obj = new Object
        if (urls.startsWith("?")) urls = urls.slice(1, urls.length);
        this.unQuote(urls.replaceAll("+", " "), [/&/i, "="], true).map(e => {
            if (e.length > 0) {
                if (e.length > 1) obj[e[0]] = e[1];
                else obj[e[0]] = null;
            }
        });
        return obj;
    }

    // ex: let [ elementTrace, context ] = q.createQuery("div[style=background-color: limegreen; width: 20%; height: 20%; margin: 4%;]#test.smallGroup.union", false);
    createQuery (context, create = true) {

        let attrs, brackets, caches, element, idString, idSession, classlist, classSessions, classCaches, cacheAttrs, obj;
 
        attrs = new Array;
        brackets = "";
        caches = "";
        element = null;
        idString = "";
        idSession = false;
        obj = new ElementTrace;
        classlist = obj.classList;
        classSessions = false;
        classCaches = "";
        cacheAttrs = "";

        if (context && typeof context == "object" && !this.isArray(context)) {
            if (ElementTrace.prototype.isPrototypeOf(context)) {
                if (context?.nodeName) {
                    caches = context?.nodeName?.toLowerCase();
                    element = document.createElement(context?.nodeName);
                    if (context?.id) {
                        element.setAttribute("id", context?.id);
                        caches += "\#" + context?.id;
                    };
                    if (context?.classList) {
                        element.classList.add(...context?.classList);
                        context?.classList?.forEach(c => {
                            caches += "\." + c;
                        });
                    };
                    if (context?.attributes) {
                        for (let attr in context?.attributes) {
                            element.setAttribute(attr, context?.attributes[attr]);
                        }
                    }

                    context = caches;
                    caches = "";

                    if (create) return element;
                    return context;
                }
            }
            return [ new ElementTrace, new String ];
        }

        function classlist_push() {
            if (classCaches.length > 0) {
                classlist.push(classCaches);
                classSessions = false;
                classCaches = "";
            }
        }

        function attrs_push() {
            if (cacheAttrs.length > 0) {
                attrs = this.unQuote(cacheAttrs, [ /\&|\,/i, "=" ])
                cacheAttrs = "";
            }
        }

        attrs_push = attrs_push.bind(this);

        for (let puts of context) {

            if (brackets.length < 2) {

                if (brackets.length == 0 ? puts == "\[" : puts == "\]") {
                    brackets += puts;
                    classlist_push();
                    idSession = false;
                    classSessions = false;
                    continue;
                }

                if (brackets.length > 0) {
                    cacheAttrs += puts;
                    continue;
                }

            } else {
                
                attrs_push();
                brackets = "";
            }

            if (puts == "\#") {
                classlist_push();
                idSession = true;
                classSessions = false;
                idString = "";
                continue;
            }

            
            if (puts == "\.") {
                classlist_push();
                classSessions = true;
                idSession = false;
                continue;
            }

            if (idSession) {
                idString += puts;
                continue;
            }

            if (classSessions) {
                classCaches += puts;
                continue;
            }
            
            caches += puts;
        }

        attrs_push();
        classlist_push();

        context = caches;
        caches = "";

        if (!(context.length > 0)) return [ new ElementTrace, new String ]; 

        obj["nodeName"] = context.toUpperCase();
        if (create) element = document.createElement(context);

        if (idString.length > 0) {
            if (create) element.setAttribute("id", idString);
            obj["id"] = idString;
            context += "\#" + idString;
        }

        if (classlist.length > 0) {
            if (create) element.classList.add(...classlist);
            // obj["classList"] = classlist;
            classlist.forEach(cls => {
                context += "\." + cls;
            });
        }

        if (attrs.length > 0) {
            obj["attributes"] = new Object;
            for (let attr of attrs) {
                if (attr.length > 1) {
                    if (create) element.setAttribute(attr[0], attr[1]);
                    obj["attributes"][attr[0]] = attr[1];
                } else {
                    if (create) element.setAttribute(attr[0], "");
                    obj["attributes"][attr[0]] = ""
                }
            }
        }
 
        if (create) return [ element, context ]
        return [ obj, context ];
    }

    parseQueries (queries) {

        const target = this.target || document;
        const skQueryClone = this.constructor.bind(this); 
        const isarray = this.isArray(target);

        if (target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).parseQueries(queries));
        }

        switch (typeof queries) {
            case "string":

                if (queries.startsWith("!")) {

                    queries = queries.slice(1);
                    
                    return new skQueryClone(this.createQuery(queries)[0]);

                } else
                if (queries.endsWith("*")) {

                    queries = queries.slice(0, queries.length -1);

                    let almost_an_element = this.createQuery(queries, false);
                    let elements = target.querySelectorAll(almost_an_element[1]);

                    if (elements) return new skQueryClone(Array.from(elements)
                    .map(t => new skQueryClone(t?.target || t)));
                    return new skQueryClone;

                } else {

                    let almost_an_element = this.createQuery(queries, false);
                    let element = target.querySelector(almost_an_element[1]);

                    if (!element) return new skQueryClone(this.createQuery(almost_an_element[0])[0]);
                    return new skQueryClone(element);
                }
                
                // break; useless
            
            case "object":

                if (skQueryClone.prototype.isPrototypeOf(queries)) queries = queries?.target || queries;

                if (this.isArray(queries)) {

                    return new skQueryClone(queries.map(q => this.parseQueries(q)));
                } else
                if (Element.prototype.isPrototypeOf(queries) || 
                    Document.prototype.isPrototypeOf(queries) || 
                    DocumentFragment.prototype.isPrototypeOf(queries) || 
                    Window.prototype.isPrototypeOf(queries)) {

                    return new skQueryClone(queries);
                }
                
                break;

        }
        
        return null;
    }

    ready(fn) {
        let callback = this.readyState(fn, new skQueryReadyEvent);
        let target = this.target || document;
        target.addEventListener("readystatechange", _ => {
            return callback();
        }, true)
        window.addEventListener("DOMContentLoaded", _ => {
            return callback();
        }, true)
        target.addEventListener("load", _ => {
            return callback();
        }, true)
        window.addEventListener("load", _ => {
            return callback();
        }, true)
        callback();
        return null;
    }

    class(...cls) {
        
        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const isarray = this.isArray(target);

        if (cls.length > 0) {
            if (target) {
                if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).class(...cls));
                cls.forEach((c => {
                    if (!target?.classList?.contains(c)) target?.classList?.add(c);
                }).bind(this));
            }
        }
        return target?.classList;
    }
    
    classRemove(...cls) {

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const isarray = this.isArray(target);

        if (cls.length > 0) {
            if (target) {
                if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).classRemove(...cls));
                cls.forEach((c => {    
                    if (target?.classList?.contains(c)) target?.classList?.remove(c);
                }).bind(this));
            }
        }
        return target?.classList;
    }

    ignoreTransformStyle (transforms, ignore) {
        
        let caches, isarray, isregex;
        caches = "";
        isregex = this.isRegex(ignore);
        isarray = this.isArray(ignore);

        // if(this.isArray(ignore)) {
        //     caches = transforms;
        //     ignore?.forEach((e => {
        //         caches = this.ignoreTransformStyle(caches, e);
        //     }).bind(this));
        //     return caches;
        // }

        if (transforms && typeof transforms == "string") this.unQuote(transforms, "\)", !0, !0).forEach((transform => {
            let test, continues;
            
            test = "";
            continues = false;

            for (let puts of transform) {
                if (puts == "\(") break;
                if (puts == " ") continue; 
                test += puts;
            }
            if (!isarray) {
                if (!isregex ? transform && !test?.startsWith(ignore) : transform && !ignore?.test(test)) {
                    caches += (!caches ? transform : " " + transform) + "\)";
                }
            } else {
                continues = false;
                ignore?.forEach((e => {
                    if (!this.isRegex(e) ? transform && test?.startsWith(e) : transform && e?.test(test)) {
                        continues = true;
                    }
                }).bind(this));
                if (!continues) caches += (!caches ? transform : " " + transform) + "\)";
            }

        }).bind(this));

        return this.unSpaceText(caches);
    }

    rotate(degrees) {

        if (degrees && typeof degrees == "number") degrees = `${degrees}deg`

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const transforms = this.ignoreTransformStyle(target?.style?.transform || "", "rotate");
        const isarray = this.isArray(target);

        if(target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).rotate(degrees));
            if ("style" in target) target.style.transform = `rotate(${degrees})${transforms? " " + transforms : ''}`;
        }

        return transforms;
    }

    scale(w, h) {

        if (typeof w == "string") w = parseInt(w); 
        if (typeof h == "string") h = parseInt(h);

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const transforms = this.ignoreTransformStyle(target?.style?.transform || "", "scale");
        const isarray = this.isArray(target);

        if(target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).scale(w, h));
            if ("style" in target) target.style.transform = `scale(${w}, ${h})${transforms? " " + transforms : ''}`;
        }

        return transforms;
    }

    translate(x, y) {

        // if (typeof x == "number") x = `${x}px`;
        // if (typeof y == "number") y = `${y}px`;

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        // const transforms = this.ignoreTransformStyle(target?.style?.transform || "", [ "translate", "translateX", "translateY" ]);
        const transforms = this.ignoreTransformStyle(target?.style?.transform || "", [ "translateX", "translateY" ]);
        const isarray = this.isArray(target);

        if(target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).translate(x, y));
            // if ("style" in target) target.style.transform = `translate(${x}, ${y})${transforms? " " + transforms : ''}`;
            this.translateX(x);
            this.translateY(y);
        }

        return transforms;
    }

    translateX(x) {

        if (typeof x == "number") x = `${x}px`;

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        // const transforms = this.ignoreTransformStyle(target?.style?.transform || "", [ "translate", "translateX" ]);
        const transforms = this.ignoreTransformStyle(target?.style?.transform || "", "translateX");
        const isarray = this.isArray(target);

        if(target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).translateX(x));
            if ("style" in target) target.style.transform = `translateX(${x})${transforms? " " + transforms : ''}`;
        }

        return transforms;
    }

    translateY(y) {

        if (typeof y == "number") y = `${y}px`;

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        // const transforms = this.ignoreTransformStyle(target?.style?.transform || "", [ "translate", "translateY" ]);
        const transforms = this.ignoreTransformStyle(target?.style?.transform || "", "translateY");
        const isarray = this.isArray(target);

        if(target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).translateY(y));
            if ("style" in target) target.style.transform = `translateY(${y})${transforms? " " + transforms : ''}`;
        }

        return transforms;
    }

    borderRadius (value) {
        
        if (typeof value == "number") value = `${value}px`;
        
        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const isarray = this.isArray(target);

        if(target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).borderRadius(value));
            if ("style" in target) {

                target.style.borderTopLeftRadius = value;
                target.style.borderTopRightRadius = value;
                target.style.borderBottomRightRadius = value;
                target.style.borderBottomLeftRadius = value;

            }
        }

        return value;
    }

    toCircle() {

        return this.borderRadius("50\%");
    }

    hide () {

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const display = target?.style?.display || "";
        const isarray = this.isArray(target);

        if(target) {
            
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).hide());
            
            // save current display style
            target.__style_display__ = display;
            if ("style" in target) target.style.display = "none";
        }

        return target?.style?.display || display;
    }

    show () {

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const display = target?.style?.display || "";
        const isarray = this.isArray(target);

        if(target) {
            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).show());
            if ("style" in target) target.style.display = target?.__style_display__ || "block";
        }

        return target?.style?.display || display;
    }

    on (type, listener, options = true) {

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const isarray = this.isArray(target);

        if(target && type && typeof type == "string") {

            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).on(type, listener, options));
            
            let listen = false;
            // save current listeners
            if (!(this.isArray(target?.__listeners__))) target.__listeners__ = new Array;
            if (!(target?.__listeners__.includes(listener))) {
                target.__listeners__.push(listener);
                listen = true;
            }
            
            if (typeof listener == "function" && listen) target.addEventListener(type, listener, options) 

        }

        return options;
    }

    removeEvent (type, listener, options) {

        const target = this.target || document?.body;
        const skQueryClone = this.constructor.bind(this);
        const isarray = this.isArray(target);

        if(target && type && typeof type == "string") {

            if (isarray) return target.map(t => (new skQueryClone(t?.target || t)).removeEvent(type, listener, options));
            
            let listen = true;
            // save current listeners
            if (this.isArray(target?.__listeners__) && target?.__listeners__.includes(listener)) {
                target.__listeners__.splice(target.__listeners__.indexOf(listener), 1);
                listen = false;
            }
            
            if (typeof listener == "function" && !listen) target.removeEventListener(type, listener, options) 

        }

        return options;
    }

}

// Queue Main isReady

export class skQueueMainActivity extends skQuery {

    constructor(...args) {

        super();

        this.listeners = new Array;
        this.params = this.parseUrlSearch(location.search);

        this.init();

    }

    init() {

        this.ready((e => {

            this.listeners.forEach((listener => {

                listener.bind(this).call(this.params);

            }).bind(this))

            this.listeners = new Array;

        }).bind(this));

    }

    fallback() {

        // reinit
        this.init();
    }

    enqueue(fn) {
        if (!this.listeners.includes(fn)) this.listeners.push(fn);
        return null;
    }

    dequeue() {
        if (this.listeners.length > 0) return this.listeners.shift();
        return null;
    }
}

export class skBytes extends Object {

    constructor () {

        super();


    }

    fromhex(contexts) {

        if (contexts && Array.isArray(contexts)) {

            return contexts.map((v => {

                return String.fromCodePoint(this.fromhex(v));
            
            }).bind(this));
        }

        if (typeof contexts != "string" || !contexts) return 0;

        let puts, c, context, m, n, x;

        context = "0123456789abcdef";
        
        c = 0;
        m = 0;
        n = 0;
        x = 0;

        n = contexts.length;

        m = n / 2;

        if (m == .5) { // single

            x = context.indexOf(contexts);
            
            if (-1 < x) return x;
            return 0;
        } else
        if (!m%2) { // multi, double processing

            for (let i = 0; i < m; i++) {

                // 0 1 2
                // 0 2 4
                // i * 2

                c += (256 ** (m -1 -i)) * this.fromhex(contexts[i * 2] + contexts[(i * 2) +1]);
            }

            return c;
        }

        for (let i = 0; i < n; i++) { // multi
            
            puts = contexts[i];

            x = context.indexOf(puts);
            
            if (-1 < x) c += (16 ** (n -1 -i)) * x;

        }

        return c;
    }
}

export class skBufferText extends Object {

    constructor (...args) {

        super();

        this.buffer = new Uint8Array;

    }

    encode(context, unicode = true) {

        if (typeof context != "string" || !context) return null;

        if (unicode) this.buffer = new Uint32Array(Array.from(context).map(e => e.codePointAt()));
        else this.buffer = new Uint8Array(Array.from(context).map(e => e.codePointAt()));
        if (unicode) this.buffer = new Uint8Array(this.buffer?.buffer || this.buffer);

        return this.buffer;
    }

    decode(buffer = null, unicode = true) {

        let returns;
        returns = null;

        if (buffer) this.buffer = buffer;

        if (!this.buffer || this.buffer?.length == 0 || !Uint8Array.prototype.isPrototypeOf(this.buffer)) return new Array;

        if (unicode) this.buffer = new Uint32Array(this.buffer?.buffer || this.buffer);
        
        returns = Array.from(this.buffer).map(e => String.fromCodePoint(e));
        
        this.buffer = null;

        return returns;
    }
}

export class skStyleSheetTrace extends CSSStyleSheet {
    
    constructor () {
        
        super();
    
    }

}

export class skStyleSheetHandler extends Object {

    constructor () {
        super();

        this.styleSheets = null;

        // bypass document.styleSheets
        this.init();

    }
    
    init() {
        if (Array.from(document?.head?.children).filter(elem => elem?.nodeName == "STYLE").length == 0) {
            let style = document.createElement("style");
            document.head.append(style);
            this.styleSheets = [
                style.sheet
            ];
            return null;
        }

        this.styleSheets = Array.from(document.styleSheets);
        
        // fault tolerance
        // if (this.styleSheets.length == 0) this.styleSheets = [
        //     new class CSS extends CSSStyleSheet {
        //         constructor () {
        //             super();
        //         }
        //     }
        // ];
        
        return null;
    }

    convertArrayToObject (array) {
        let obj;
        obj = new Object;
        array.forEach(attr => {
            if (attr && Array.isArray(attr)) {
                if (attr?.length > 1) obj[attr[0]] = attr[1];
                else if (attr?.length > 0) obj[attr[0]] = null;
            } else
            if (attr && typeof attr == "string") obj[attr] = null;
        });
        return obj;
    }

    convertStyleAttrLikeJs (attr) {
        
        if (attr && Array.isArray(attr)) return attr.map((attribute => {
            return this.convertStyleAttrLikeJs(attribute);
        }).bind(this));

        let caches, upper;
        upper = false
        caches = "";
        for (let puts of attr) {
            if (puts == "\-") {
                upper = true;
                continue;
            };
            if (upper) {
                caches += puts.toUpperCase();
                upper = false;
                continue;
            }
            caches += puts;
        }
        return caches;
    }

    convertStyleLikeJs(selector, rule) {
        
        let style, styleSheet, selectorText;
        // render test
        // fake CSSStyleSheet
        styleSheet = new skStyleSheetTrace;
        styleSheet?.insertRule(`${selector} \{ ${rule} \}`);
        style = Array.from(styleSheet?.cssRules).shift();
        selectorText = style?.selectorText;
        style = style.style;
        style = Array.from(style).map((attr => [ this.convertStyleAttrLikeJs(attr), style[attr] ]).bind(this))
        // compare
        // return
        return [ selectorText, this.convertArrayToObject(style) ];
    }

    getAllStyleSheets() {

        return Array.from(this.styleSheets).map((styleSheet => {
            
            let selectorText;
            // let style, selectorText;
            // style = Array.from(styleSheet?.cssRules).shift();
            
            return Array.from(styleSheet?.cssRules).map((style => {
                selectorText = style?.selectorText;
                style = style.style;
                style = Array.from(style).map((attr => [ this.convertStyleAttrLikeJs(attr), style[attr] ]).bind(this))
                return [ selectorText, this.convertArrayToObject(style) ];
            }).bind(this));

        }).bind(this));
    }
    
    // ex: q.styleSheetHandler.contains(".circle", "border-radius: 50%; margin: 12px;");
    contains(selector, rule) {
        
        let a, b, c;

        c = false;

        if (!(this.styleSheets && Array.isArray(this.styleSheets))) return false;
        if (this.styleSheets?.length == 0 || this.styleSheets[0]?.cssRules?.length == 0) return false;
        
        a = this.convertStyleLikeJs(selector, rule);
        b = this.getAllStyleSheets();

        for (let rules of b) {

            for(let compare of rules) {

                if (!(compare && Array.isArray(compare) && compare.length > 1)) return false;
                if (compare[0] != a[0]) {
                    c = true;
                    continue;
                }
                
                let value;
                c = false;
                value = "";
    
                // from a to compare
                for (let attr in a[1]) {
                    value = a[1][attr];
                    if (c) continue;
                    if (attr in compare[1]) {
                        if (compare[1][attr] != value) {
                            c = true;
                        }
                    } else {
                        c = true;
                    }
                }

                // from compare to a
                for (let attr in compare[1]) {
                    value = compare[1][attr];
                    if (c) continue;
                    // if (attr in a[1]) {
                    //     if (a[1][attr] != value) {
                    //         c = true;
                    //     }
                    // } else {
                    //     c = true;
                    // }
                    if (!(attr in a[1])) {
                        c = true;
                        break;
                    }
                }

                if(!c) break;
            }

            if(!c) break;
        }

        return !c;
    }

    setAttribute(selector, rule, options = false) {

        if (typeof selector != "string" || !selector) return options;
        if (typeof rule != "string" || !rule) return options;

        if (!this.contains(selector, rule)) {
            if (options) {
                this.styleSheets.forEach(styleSheet => {
                    styleSheet?.insertRule(`${selector} \{ ${rule} \}`, 0);
                })
            } else {
                if (this.styleSheets.length > 0) {
                    this.styleSheets[0]?.insertRule(`${selector} \{ ${rule} \}`, 0);
                }
            }
        }

        return options;
    }

    getAttribute(selector, options = false) {

        let a, b;

        a = this.getAllStyleSheets();
        
        b = new Array;

        for (let rules of a) {

            for(let compare of rules) {

                if (!(compare && Array.isArray(compare) && compare.length > 1)) return null;
                
                let caches;
                caches = "";

                for (let puts of compare[0]) {

                    if (puts == " ") {
                        if (caches == selector) {
                            b.push(compare[1]);
                            break;
                        }
                        caches = "";
                        continue;
                    }

                    caches += puts;
                }

                if (caches.length > 0) {
                    if (caches == selector) {
                        b.push(compare[1]);
                    }
                }

                if (b.length > 0 && !options) break;
            }

            if (b.length > 0 && !options) break;
        }

        if (!options && b.length > 0) return b[0];
        return b;
    }

    elementTraceStyle(et) {
        if (et && ElementTrace.prototype.isPrototypeOf(et)) {

            // attributes?.style to style
            Object.defineProperty(et, "style", {
                get: (function() {
                    let style = et?.attributes?.style;
                    if (style && typeof style == "string") return this.convertStyleLikeJs("none", style)[1];
                    return null;
                }).bind(this),
                configurable: false,
                enumerable: false
            });

            // todos
            // style to attributes?.style
            // object to string
            // Object.getOwnPropertyNames
        }
        return null;
    }

}

export class skSurface extends skQuery {

    constructor(...args) {

        super();

        let q = new skQuery;

        this.target = q.parseQueries("!div[style=background-color: limegreen; width: 20vw; height: 20vw; margin: 0; padding: 0;]").target;

    }
}

export class skSurfaceCircle extends skSurface {

    constructor(...args) {

        super();
        
        this.toCircle();

    }
}

export class skSurfaceTriangle extends skSurface {

    constructor () {

        super();

        this.data = new Object;

        this.data.w = this.target.style.width;
        this.data.h = this.target.style.height;
        this.data.bg = this.target.style.backgroundColor;


        this.target.style.backgroundColor = "";
        this.target.style.borderStyle = "solid";
        this.target.style.boxSizing = "border-box";

        this.topArrow();


    }

    topArrow() {
        let { w, h, bg } = this.data;
        this.target.style.borderColor = `transparent transparent ${bg} transparent`;
        this.target.style.borderWidth = `calc(${h} * 1/3) calc(${w}/2) calc(${h} * 2/3) calc(${w}/2)`;
    }
    
    rightArrow() {
        let { w, h, bg } = this.data;
        this.target.style.borderColor = `transparent transparent transparent ${bg}`;
        this.target.style.borderWidth = `calc(${h}/2) calc(${w} * 1/3) calc(${h}/2) calc(${w} * 2/3)`;
    }
    
    bottomArrow() {
        let { w, h, bg } = this.data;
        this.target.style.borderColor = `${bg} transparent transparent transparent`;
        this.target.style.borderWidth = `calc(${h} * 2/3) calc(${w}/2) calc(${h} * 1/3) calc(${w}/2)`;
    }
    
    leftArrow() {
        let { w, h, bg } = this.data;
        this.target.style.borderColor = `transparent ${bg} transparent transparent`;
        this.target.style.borderWidth = `calc(${h}/2) calc(${w} * 2/3) calc(${h}/2) calc(${w} * 1/3)`;
    }
}

export class skQueryManager extends skQuery {

    constructor() {

        super();

        this.QueueMainActivity = new skQueueMainActivity;
        this.Bytes = new skBytes;
        this.StyleSheetHandler = new skStyleSheetHandler;
        this.BufferText = new skBufferText;
    
        // customizable
        this.Surface = skSurface;
        this.SurfaceTriangle = skSurfaceTriangle;
        this.SurfaceCircle = skSurfaceCircle;
    }

    get Query() {

        return this.parseQueries.bind(this);
    }

    set Query(value) {} // writable no - permission
}

// export default function $ (context) {
//     let q = new skQuery;
//     return  q.parseQueries.bind(q).apply(this || context, arguments);
// };

// export function Q() {

//     let q = new skQuery;

//     q.QueueMainActivity = new skQueueMainActivity;
//     q.Bytes = new skBytes;
//     q.StyleSheetHandler = new skStyleSheetHandler;
//     q.BufferText = new skBufferText;

//     q.Surface = skSurface;
//     q.SurfaceTriangle = skSurfaceTriangle;
//     q.SurfaceCircle = skSurfaceCircle;

//     Object.defineProperty(q, "Query", {
//         get: function() {
//             return q.parseQueries.bind(q);
//         },
//         set: function(v) {}, // must be not writable, alternative
//         configurable: false,
//         enumerable: false

//     })

//     return q;
// }
