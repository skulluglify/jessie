"use strict";

function recurs(v) {
    
    // object
    if (typeof v == "object" && !Array.isArray(v)) {

        if (v == null) return "null";

        const keys = Object.keys(v);

        let context = "{";

        for (let i = 0; i < keys.length; i++) {

            let key = keys[i];

            let value = recurs(v[key]);

            context += `${key}: ${value}`;

            if (((i+1) < keys.length)) {

                context += ",";
            }
        }

        context += "}";

        return context;
    }

    // array
    else if (typeof v == "object") {

        let context = "[";

        for (let i = 0; i < v.length; i++) {

            let value = recurs(v[i]);

            context += ` ${value}`;

            if (((i+1) < v.length)) {

                context += ",";
            }
        }

        context += "]";

        return context;
    }

    // number
    else if (typeof v == "number") {

        return `${v}`;
    }

    // boolean
    else if (typeof v == "boolean") {

        return !!v ? "true" : "false";
    }

    // string
    else if (typeof v == "string") {

        return "\"" + v + "\""; 
    }

    // unknown
    return "null";

}

if (typeof module != "object") module = {};
// module.exports = {};
// module.exports.default = recurs;
// Object.defineProperty(module.exports, "__esModule", { value: true });
module.exports = recurs;
