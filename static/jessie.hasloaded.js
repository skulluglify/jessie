// module: enable

import { skQueryManager } from "./jessie.js";
import { Render } from "./jessie.render.js";

let q = new skQueryManager;
let r = new Render;
let $ = q.Query;

globalThis.q = q;

// compare with ready function
$(document).ready(function main() {

    // let s = new q.Surface;
    // let t = new q.SurfaceTriangle;
    // let o = new q.SurfaceCircle;

    // console.log(document.readyState);
    
    // document.body.append(t.target);
    // document.body.append(o.target);
    // document.body.append(s.target);

    (async function() {

        let [ fragment, selectors ] = await r.eval(await fetch("example.jessie").then(e => e.text()));
        console.log(fragment, selectors);
        document.body.append(fragment);
    })()
});

// // compare with QueueMainActivity 
// q.QueueMainActivity.enqueue(e => {

//     console.log(43);
// });

// q.QueueMainActivity.enqueue(e => {

//     console.log(44);
// });

// q.QueueMainActivity.enqueue(e => {

//     console.log(45);
// });

// q.QueueMainActivity.enqueue(e => {

//     console.log(46);
// });

// // fallback
// q.QueueMainActivity.fallback();
