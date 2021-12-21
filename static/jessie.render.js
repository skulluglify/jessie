/*
    sk: skulluglify
*/

import { skQueryManager, ElementTrace } from "./jessie.js";
import { Package } from "./jessie.package.js";

globalThis.package = Package;

let q = new skQueryManager;
let $ = q.Query;

export class Render extends Object {

    constructor() {

        super();

        this.TABSPACESIZE = 4;

        this.pipelines = new Array;

        this.package = new Package;
        this.path = this.package.path;

        this.nodups = new Array;

        this.defaultLocalePath = "";
    }

    usePipeline(pipeline) {

        this.pipelines.splice(0,0,pipeline);
    }
    
    get parseInit() {

        let has_initialized = false;

        return function __init__() {

            if (!has_initialized) {
                
                this.pipelines.splice(0,0,this.parseBetterLookQueryPerLine);
                this.pipelines.splice(0,0,this.parseIncludeFilePerLine);
                this.pipelines.splice(0,0,this.parseConfigVirtualAuto);
                this.pipelines.splice(0,0,this.parseNoDuplicateAuto);
                this.pipelines.splice(0,0,this.parseJavaScriptAuto);
                this.pipelines.splice(0,0,this.parseCommitPerLine);
                // this.pipelines.push(this.parseCommitPerLine);
                // this.pipelines.push(this.parseJavaScriptAuto);
                // this.pipelines.push(this.parseNoDuplicateAuto);
                // this.pipelines.push(this.parseIncludeFilePerLine);
                this.pipelines.push(this.parseQueryPerLine);
                has_initialized = false;
            }
        }   
    }

    _get_source(src) {

        if (src.startsWith("http:")) {

            // pass

        } else if (src.startsWith("mo:")) {

            /**
             * 
             * .
             * ..
             * mo:
             * pkg:
             */

            src = src.substr("mo:".length, src.length);
            src = this.path.join("./jessie_modules/", src);
        
        } else if (src.startsWith("pkg:")) {

            src = src.substr("pkg:".length, src.length);
            src = this.path.join("./jessie_modules/", src);
        
        } else {

            if ([".", ".."].includes(src.split("/").shift())) {
                
                src = this.path.simplify(this.path.join(this.defaultLocalePath, src));
            
            } else {
                
                src = this._get_source("pkg:" + src);
            }
        }

        if (!["jessie", "mjs", "js", "css", "txt"].includes(this.path.basename(src).split(".").pop())) {

            src = this.path.simplify(this.path.join(src, "component.jessie"));
        }

        return src;
    }

    _split_shl(context) {

        let arrayList = new Array;

        let data = Array.from(context);

        let _shl = 0;

        let _shl_index = 0;

        let n = data.length;

        for (let i = 0; i < n; i++) {

            let puts = data[i];

            if (puts == "<") {

                _shl += 1;
                _shl_index = i;

                if (_shl == 2) break;
            }

            _shl = 0;
        }

        if (_shl_index > 0) {

            arrayList.push(context.substr(0,_shl_index -1));
            arrayList.push(context.substr(_shl_index +1, context.length));

        } else {

            arrayList.push(context);
        }

        return arrayList;
    }

    async _fetch_auto_cache(input, init) {

        let key = input.replaceAll("/", "_").replaceAll(".", "_");

        let sizeStorage = await navigator.storage.estimate();
        let sizeLimitCache = 150 * 1e3;
        let sizeLimitCacheLength = Math.floor(sizeStorage.quota / sizeLimitCache);

        let dataLocal = localStorage.getItem(key);

        if (!dataLocal) {

            let data = await fetch(input, init);
            let context = await data.text();

            // limit 150KB
            let sizeFile = context.length * 8;

            if (sizeFile <= sizeLimitCache && localStorage.length <= sizeLimitCacheLength) {
    
                localStorage.setItem(key, context);
            }
    
            return context;
        }

        return dataLocal;
    }

    setDefaultLocalePath(src) {

        this.defaultLocalePath = src;
    }

    async eval(context) {

        let obj, start, wait;
        obj = new Object; // alocate mems

        this.parseInit();

        let defaultLocalePath = `${this.defaultLocalePath}`; // copy string

        obj.virtualConfig = {};

        obj.imports = async function __import__ (src) {

            let render = new Render;
            render.setDefaultLocalePath(defaultLocalePath);

            return render._fetch_auto_cache(render._get_source(src));
        }
        
        obj.document = new DocumentFragment;
        obj.head = document.createElement("head");
        obj.body = document.createElement("body");
        
        obj.document.head = obj.head;
        obj.document.body = obj.body;

        // obj.document.append(obj.document.head);
        // obj.document.append(obj.document.body);

        obj.element = new DocumentFragment;
        obj.parent = obj.element;
        obj.currentElement = obj.parent;
        
        obj.selectors = new Array;
        obj.nodups = Array.from(this.nodups);
        
        obj.tabs = 0;
        obj.caches = "";
        
        start = true;
        wait = true;

        context += "\n";

        for (let puts of context) {

            // priority 1
            // 
            // priority 2
            // priority 3

            if ([" ", "\t"].includes(puts) && start) {
                obj.tabs = obj.tabs +(puts == "\t" ? this.TABSPACESIZE : 1);
                continue;
            }

            start = false;

            if (puts == "\n") {

                obj.caches = q.unSpaceText(obj.caches);

                if (obj.caches.length > 0) {
                    for (let rule of this.pipelines) {
                        if (rule && typeof rule == "function" && obj.caches.length > 0) {
                            wait = await rule(obj);
                            if (!wait) break;
                        }
                    }
                    // if (!wait) continue;
                }
                
                obj.tabs = 0;
                start = true;
                obj.caches = "";
                continue;
            }

            obj.caches += puts;
        }

        // return [ obj.document, obj?.selectors || new Array ];

        return {

            document: obj.document,
            element: obj.element,
            selectors: obj.selectors,
            nodups: obj.nodups,

        };
    }

    async renderJessieAuto(src) {

        src = this._get_source(src);

        let dirname = this.path.dirname(src);

        this.setDefaultLocalePath(dirname);

        let context = await this._fetch_auto_cache(src);
        let data = await this.eval(context);

        document.body.append(data.element);

        Array.from(data.document.head.children).forEach((element) => {

            data.document.head.remove(element);
            document.head.append(element);
        })

        Array.from(data.document.body.children).forEach((element) => {

            data.document.body.remove(element);
            document.body.append(element);
        })

        return data;
    }

    //TODOs
    // FUTURES -- // /* */
    get parseCommitPerLine() {

        let comment_zone;
        comment_zone = false;

        return function __cache__ (obj) {

            if (obj.caches.startsWith("\/\*")) comment_zone = true;
            
            if (!!comment_zone && obj.caches.endsWith("\*\/")) {
                comment_zone = false;
                return false;
            }
            
            if (!!comment_zone) {
                return false;
            }


            if (obj.caches.startsWith("--") || obj.caches.startsWith("\/\/")) {
                return false;
            }

            return true;
        }
    }

    get parseIncludeFilePerLine() {

        let INCLUDE_HEADER = "include";
        let IMPORT_HEADER = "import";

        let includeFiles = new Array;
        let path = this.path;
        let defaultLocalePath = this.defaultLocalePath;
        

        let element_builder_context = "";

        return (async function __cache__(obj) {

            if (obj.caches.startsWith(INCLUDE_HEADER) || obj.caches.startsWith(IMPORT_HEADER)) {
                
                defaultLocalePath = this.defaultLocalePath;
                
                if (obj.caches.startsWith(INCLUDE_HEADER)) {

                    obj.caches = obj.caches.substr(INCLUDE_HEADER.length, obj.caches.length);
                
                } else if (obj.caches.startsWith(IMPORT_HEADER)) {
                    
                    obj.caches = obj.caches.substr(IMPORT_HEADER.length, obj.caches.length);

                } else {

                    throw `something wrong!`;
                }
                
                includeFiles = Array.from(q.unQuote(obj.caches, / /i, true, false));
                obj.caches = "";

                includeFiles = includeFiles.map(((src) => {

                    return this._get_source(src);

                }).bind(this))

                includeFiles = includeFiles.filter((src) => {

                    // http://
                    // https://
                    // auto builder .js .mjs .css

                    if (/\.(m?js|css|txt)$/i.test(src)) {

                        switch (src.split(".").pop()) {
                            case "js":

                                element_builder_context = `script[src="${src}"&type="text/javascript"]`;
                                break;
                                
                            case "mjs":

                                element_builder_context = `script[src="${src}"&type="module"&async]`;
                                break;
                                
                            case "css":
                                    
                                element_builder_context = `link[rel="stylesheet"&href="${src}"]`;
                                break;
                            
                            case "txt":

                                element_builder_context = `text-stream[src="${src}"]`;
                                break;
                                
                            default:
                                break;
                        }
                        
                        if (!obj.nodups.includes(element_builder_context)) {

                            let [ et, _ ] = q.createQuery(element_builder_context, false);
                            let element = q.createQuery(et);

                            obj.nodups.push(element_builder_context);
                            
                            if (et?.nodeName == "SCRIPT") {
                                
                                obj.document.body.append(element);
                                
                            } else if (et?.nodeName == "LINK") {
                                
                                obj.document.head.append(element);
                            
                            } else {

                                obj.parent.append(element);    
                            }
                        }

                        return false;
                    }

                    return true;
                })
                                
                if (includeFiles.length > 0) {

                    let r = new RenderFile;

                    includeFiles = includeFiles.map(async (src) => {

                        return await r.openAsync(src);
                    })

                    includeFiles = await Promise.all(includeFiles);

                    // collect document and selector
    
                    includeFiles.forEach((data) => {
    
                        data = data?.data || {};

                        obj.parent.append(data.element);
                        
                        Array.from(data.document.head.children).forEach((element) => {
                            
                            data.document.head.remove(element);
                            obj.document.head.append(element);
                        });
                        
                        Array.from(data.document.body.children).forEach((element) => {

                            data.document.body.remove(element);
                            obj.document.body.append(element);
                        });
                        
                        data.selectors.forEach((selector) => {
    
                            obj.selectors.push(selector);
                        })

                        data.nodups.forEach((selector) => {
    
                            obj.nodups.push(selector);
                        })
                    })
                }

                return false;
            }

            return true;
            
        }.bind(this))
    }

    get parseBetterLookQueryPerLine() {

        let _split_shl = this._split_shl;

        return async function __cache__(obj) {

            if (obj.virtualConfig?.virtual_better_look) {

                let concept = _split_shl(obj.caches);

                let selector = q.unSpaceText(concept.shift());

                let nodeName = "";
                let nodeAttributes = new Array;

                let nodeId = "";
                let nodeClassLists = new Array;

                let dataTrace = selector.split(" ");

                nodeName = dataTrace.shift();

                dataTrace.forEach((value) => {

                    if (value.includes("=")) {

                        nodeAttributes.push(value);
                    }
                    else if (value.startsWith("#")) {

                        nodeId = value;
                    }
                    else if (value.startsWith(".")) {

                        nodeClassLists.push(value);
                    }
                })

                let attributes = "";
                let classLists = "";

                if (nodeAttributes.length > 0) {

                    attributes = `[${nodeAttributes.join("&")}]`;
                }

                if (nodeId.length > 0) {

                    nodeId = "#" + nodeId;
                }

                if (nodeClassLists.length > 0) {

                    classLists = `.${nodeClassLists.join(".")}`;
                }

                obj.caches = `${nodeName}${attributes}${nodeId}${classLists}`;

                if (concept.length > 0) {

                    obj.caches += " <<" + concept.shift();
                }
            }

            return true;
        }
    }

    //TODOs
    // Coming Soon ... im lazy dude!
    get parseNoDuplicateAuto() {

        return async function __cache__(obj) {

            return true;
        }
    }

    get parseConfigVirtualAuto() {

        let cache, dot, CONFIG_HEADER;
        cache = "";
        dot = ".";
        CONFIG_HEADER = "!config";

        return async function __cache__(obj) {

            cache = obj.caches;

            if (cache.startsWith(CONFIG_HEADER + dot)) {

                cache = cache.substr(CONFIG_HEADER.length + 1, cache.length);

                let [configname, configvalue, ...ignored] = cache.split(" ");

                obj.virtualConfig[configname] = configvalue == "true" ? true : (configvalue == "false" ? false : null);

                return false;
            }

            return true;
        }
    }

    get parseJavaScriptAuto() {

        let contextJS, fnSync, fnReturn, doubleBrackets, tripleQuotes, doubleClosedBrackets, tripleClosedQuotes, wrapQuote, caches;
        contextJS = "";
        fnSync = null;
        fnReturn = "";
        doubleBrackets = "";
        tripleQuotes = ""; // new future
        doubleClosedBrackets = "";
        tripleClosedQuotes = ""; // new future
        wrapQuote = false;
        caches = "";

        let FN_HEADER = `"use strict"; let q, $, global, imports, doc, element; q = new this.skQueryManager; $ = q.Query; global = this.global; imports = this.imports; doc = this.document; element = this.element; return (async function sync() {\n`;

        let FN_CLOSED = "\n}).bind(this);";

        let binding = new Object;

        binding.global = globalThis;
        binding.skQueryManager = skQueryManager;
        
        return async function __cache__(obj) {

            if (tripleQuotes.length == 0 && doubleBrackets.length == 0) caches = "";

            let data = Array.from(obj.caches);
            let n = data.length;
            
            for (let i = 0; i < n; i++) {

                let puts = data[i];

                if (doubleBrackets.length > 1) {

                    // pass

                } else if (tripleQuotes.length < 3 && doubleBrackets.length == 0) {

                    if (puts == "\"") {

                        tripleQuotes += puts;
                        if ((i+1) == n) {

                            if (tripleQuotes.length < 3) {

                                caches += tripleQuotes;
                                tripleQuotes = "";
                            }
                        }
                        continue;
                    }

                    caches += tripleQuotes;
                    tripleQuotes = "";
                } else
                if (tripleQuotes.length > 2) {

                    if (puts == "\"") {

                        tripleClosedQuotes += puts;
                        
                        if (tripleClosedQuotes.length > 2) {

                            try {

                                // auto refresh
                                binding.document = obj.document;
                                binding.element = obj.currentElement;
                                binding.imports = obj.imports;
                                
                                fnSync = new Function(`${FN_HEADER} return \`${contextJS}\` ${FN_CLOSED}`).bind(binding).call();
                            
                                let wait = await fnSync.call();
                                fnReturn = wait;
                                
                            } catch(e) {
                                
                                console.warn(e);
                            }
                            
                            if (!["undefined", "null"].includes(fnReturn)) caches += fnReturn;

                            contextJS = "";
                            fnSync = null;
                            fnReturn = "";
                            tripleQuotes = "";
                            tripleClosedQuotes = "";
                            wrapQuote = false;
                            
                        }
                        continue;
                    }

                    contextJS += tripleClosedQuotes;
                    tripleClosedQuotes = "";

                    contextJS += puts;
                    continue;
                }

                // no conflicts
                if (tripleQuotes.length > 2) continue;

                if (doubleBrackets.length < 2) {

                    if (doubleBrackets.length == 0 ? "\[\{".includes(puts) : "\[\{\%".includes(puts)) {

                        doubleBrackets += puts;
                        if ((i+1) == n) {
                            
                            if (doubleBrackets.length < 2) {

                                caches += doubleBrackets;
                                doubleBrackets = "";
                            }
                        }
                        continue;
                    }

                    caches += doubleBrackets;
                    doubleBrackets = "";

                } else 
                if (doubleBrackets.length > 1)
                {

                    if (doubleClosedBrackets.length == 0 && (doubleBrackets[0] == "\{" ? "\%\}".includes(puts) : "\%\]".includes(puts))) {
                        
                        doubleClosedBrackets += puts;
                        continue;
                    }

                    if (doubleClosedBrackets.length > 0 && (doubleBrackets[0] == "\{" ? puts == "\}" : puts == "\]")) {
                        
                        doubleClosedBrackets += puts;
                    }

                    if (doubleClosedBrackets.length > 1) {

                        if (["\{\%", "\{\{"].includes(doubleBrackets) && ["\%\}", "\}\}"].includes(doubleClosedBrackets)) {
                            wrapQuote = true;
                        }
    
                        try {

                            // auto refresh
                            binding.document = obj.document;
                            binding.element = obj.currentElement;
                            binding.imports = obj.imports;
                            
                            if (["\[\%", "\{\%"].includes(doubleBrackets)) {
    
                                fnSync = new Function(`${FN_HEADER} return ${contextJS} ${FN_CLOSED}`).bind(binding).call();
                            
                            } else {
                                
                                fnSync = new Function(`${FN_HEADER} ${contextJS} ${FN_CLOSED}`).bind(binding).call();
                            
                            }
        
                            wrapQuote = wrapQuote ? "\"" : "";
    
                            let wait = await fnSync.call();
                            fnReturn = `${wrapQuote}${wait}${wrapQuote}`;
    
                        } catch (e) {
    
                            console.warn(e);
                        }

                        // console.log(fnReturn);
    
                        if (!["undefined", "null"].includes(fnReturn)) caches += fnReturn;

                        contextJS = "";
                        fnSync = null;
                        fnReturn = "";
                        doubleBrackets = "";
                        doubleClosedBrackets = "";
                        wrapQuote = false;
                        
                        continue;
                    }

                    contextJS += doubleClosedBrackets;
                    doubleClosedBrackets = "";

                    contextJS += puts;
                    continue;
                }
                
                caches += puts;
            }

            // console.log(caches)
            
            obj.caches = caches;
            // caches = "";

            if (contextJS.length > 0) contextJS += "\n";

            if (tripleQuotes.length > 2 || doubleBrackets.length > 1) return false;
            return true;
        }
    }

    get parseQueryPerLine() {

        let _split_shl, parent, concept, et, attrs, element, selectorText, elements, mtabs, tabs, text, x;
        _split_shl = this._split_shl;
        parent = null;
        concept = new Array;
        et = null;
        attrs = null;
        element = null;
        selectorText = "";
        elements = new Array;
        mtabs = new Array;
        text = "";
        tabs = 0;
        x = -1;

        return async function __cache__(obj) {

            tabs = obj.tabs;

            concept = _split_shl(obj.caches);

            if (concept.length > 0) {

                obj.caches = q.unSpaceText(concept.shift());

                if (concept.length > 0) {
    
                    text = q.unSpaceText(concept.shift());
                }
            }

            // concept = obj.caches.split("<<");
            // if (concept.length > 0) {

            //     obj.caches = q.unSpaceText(concept[0]);

            //     if (concept.length > 1) {
    
            //         text = q.unSpaceText(concept[1]);
            //     }
            // }

            [ et, selectorText ] = q.createQuery(obj.caches, false);

            if (!et?.nodeName) return true;

            obj.selectors.push(selectorText);
            
            attrs = et?.attributes;

            if (attrs && typeof attrs == "object") {

                for (let attr in attrs) {

                    switch (attr) {

                        case "text":

                            et.text = attrs[attr];
                            delete et.attributes[attr];
                            break;

                        case "html":

                            et.html = attrs[attr];
                            delete et.attributes[attr];
                            break;

                        case "specify":

                            et.specify = attrs[attr];
                            delete et.attributes[attr];
                            break;

                        case "cstyle":

                            et.cstyle = attrs[attr];
                            delete et.attributes[attr];
                            break;
                    }
                }
            }

            if (text.length > 0) {
                et.html = text;
                text = "";
            }
            
            element = q.createQuery(et);

            let m;
            m = 0;
            for (let t of mtabs) {
                if (t < tabs) {
                    
                    obj.tabs = tabs;
                    m = m +1;
                    continue;
                } else 
                if (t != tabs) {
                    
                    obj.tabs = t;
                    console.warn("not consistent tabs from jessie files!")
                }
                else break;
            }

            if (m == 0) {

                mtabs = new Array;
                elements = new Array;
                parent = obj.element;
                obj.parent = parent;
                
                elements.push(element);
                x = elements.length -1;
                element = elements[x];

                obj.currentElement = element;

                parent.append(element);
                mtabs.push(tabs);

            } else
            {

                if (!mtabs.includes(tabs)) {

                    x = elements.length -1;
                    parent = elements[x];
                    obj.parent = parent;
                    elements.push(element);
                    element = elements[x +1];

                    obj.currentElement = element;

                    parent.append(element);
                    mtabs.push(tabs);
    
                } else 
                {

                    x = mtabs.indexOf(tabs);
                    elements[x] = element;
                    element = elements[x];

                    obj.currentElement = element;

                    elements[x -1].append(element);
                }
            }

            return false; // no more added parse function, any was null or empty!
        }
    }
}

export class RenderFile {

    constructor() {

        // super();

        this.package = new Package;
        this.module = this.package.module;
        this.path = this.package.path;
    }

    async openAsync(src, type) {

        src = this.path.simplify(src);

        // let module = this.module;
        let path = this.path;
        let dirname = path.dirname(src);
        let basename = path.basename(src);
        let render = new Render;

        render.setDefaultLocalePath(dirname);

        // let text = await module(src);
        let text = await render._fetch_auto_cache(src);
        let data = await render.eval(text);

        return {

            dirname: dirname,
            basename: basename,
            context: text,
            data: data,
        };

    }

    async open(src, type) {

        src = this.path.simplify(src);
        
        // let module = this.module;
        let render = new Render;
        
        // render.setDefaultLocalePath("./jessie_modules");
            
        // let text = await module(src);
        let text = await render._fetch_auto_cache(src);
        let data = await render.eval(text);

        return data;
    }
}