// module: enable

import { skQueryManager } from "./jessie.js";
import { Render } from "./jessie.render.js";
import "./jessie.dom.js";

let q = new skQueryManager;
let r = new Render;
let $ = q.Query;

globalThis.q = q;

// compare with ready function
q.QueueMainActivity.enqueue(function __queue__() {

    // let s = new q.Surface;
    // let t = new q.SurfaceTriangle;
    // let o = new q.SurfaceCircle;

    // console.log(document.readyState);
    
    // document.body.append(t.target);
    // document.body.append(o.target);
    // document.body.append(s.target);

    (async function() {

        r.renderJessieAuto("desktop");

    })()
});

q.QueueMainActivity.fallback();
