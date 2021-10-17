// module: enable

import { Q } from "./jessie.js";

let q = Q();
let $ = q.Query;

// compare with ready function
$(document).ready(function main() {

    console.log(document.readyState);
    alert(44);

});

// compare with QueueMainActivity 
q.QueueMainActivity.enqueue(e => {

    console.log(43);
});

q.QueueMainActivity.enqueue(e => {

    console.log(44);
});

q.QueueMainActivity.enqueue(e => {

    console.log(45);
});

q.QueueMainActivity.enqueue(e => {

    alert(22);
    console.log(46);
});

// fallback
q.QueueMainActivity.init();
