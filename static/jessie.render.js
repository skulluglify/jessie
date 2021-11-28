/*
    sk: skulluglify
*/

import { skQueryManager } from "./jessie.js";

let q = new skQueryManager;
let $ = q.Query;

export class Render extends Object {

    constructor() {

        super();

        this.TABSPACESIZE = 4;

        this.rules = new Array;

        this.rules.push(this.parseCommitPerLine);
        this.rules.push(this.parseJavaScriptAuto);
        this.rules.push(this.parseQueryPerLine);
    }

    async eval(context) {

        let obj, start, wait;
        obj = new Object; // alocate mems
        obj.document = new DocumentFragment;
        obj.selectors = new Array;
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
                    for (let rule of this.rules) {
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

        return [ obj.document, obj?.selectors || new Array ];
    }

    //!TODOS
    // FUTURES -- // /* */
    get parseCommitPerLine() {

        let fullComment;
        fullComment = false;

        return function __cache__ (obj) {

            if (obj.caches.startsWith("\/\*")) fullComment = true;
            
            if (!!fullComment && obj.caches.endsWith("\*\/")) {
                fullComment = false;
                obj.caches = "";
                return false;
            }
            
            if (!!fullComment) {
                obj.caches = "";
                return false;
            }


            if (obj.caches.startsWith("--")) {
                obj.caches = "";
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

        let FN_HEADER = `"use strict"; let q, $, global; q = new this.skQueryManager; $ = q.Query; global = this.global; return (async function sync() {\n`;

        let FN_CLOSED = "\n}).bind(this);";

        return async function __cache__(obj) {

            if (tripleQuotes.length == 0 && doubleBrackets.length == 0) caches = "";
            
            for (let puts of obj.caches) {

                if (tripleQuotes.length < 3 && doubleBrackets.length == 0) {

                    if (puts == "\"") {

                        tripleQuotes += puts;
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
                                    
                                    let binding = new Object;
                                    binding.global = globalThis;
                                binding.skQueryManager = skQueryManager;
                                binding.document = obj.document;
                                
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

                            let binding = new Object;
                            binding.global = globalThis;
                            binding.skQueryManager = skQueryManager;
                            binding.document = obj.document;
                            
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
            
            obj.caches = caches;

            if (contextJS.length > 0) contextJS += "\n";

            if (tripleQuotes.length > 2 || doubleBrackets.length > 1) return false;
            return true;
        }
    }

    get parseQueryPerLine() {

        let parent, shl, et, attrs, element, selectorText, elements, mtabs, tabs, text, x;
        parent = null;
        shl = new Array;
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

            shl = obj.caches.split("<<");

            if (shl.length > 0) {

                obj.caches = q.unSpaceText(shl[0]);

                if (shl.length > 1) {

                    text = q.unSpaceText(shl[1]);
                }
            }

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
                parent = obj.document;
                
                elements.push(element);
                x = elements.length -1;
                element = elements[x];
                parent.append(element);
                mtabs.push(tabs);
            } else
            {

                if (!mtabs.includes(tabs)) {

                    x = elements.length -1;
                    parent = elements[x];
                    elements.push(element);
                    element = elements[x +1];
                    parent.append(element);
                    mtabs.push(tabs);
                } else 
                {

                    x = mtabs.indexOf(tabs);
                    elements[x] = element;
                    element = elements[x];
                    elements[x -1].append(element);
                }
            }

            // console.log(tabs, element);

            return false; // no more added parse function, any was null or empty!
        }
    }
}

export class RenderFile extends Render {

    constructor() {

        super();
    }

    open(src, type) {}
}