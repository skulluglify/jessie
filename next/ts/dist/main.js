"use strict";
let say = "say globe!";
let age = 12;
var Log;
(function (Log) {
    Log[Log["Error"] = 0] = "Error";
    Log[Log["Log"] = 1] = "Log";
    Log[Log["Warn"] = 2] = "Warn";
})(Log || (Log = {}));
;
;
let a = { "message": say, "age": age, print() {
        console.log(this.message, this.age);
    } };
let b = { "message": say, print() { } };
let c = { "message": say, "age": 15, print() {
        console.log(this.message, this.age);
    } };
a.print();
c.print();
console.log(a, b.message);
let x = "15";
x = 15;
console.log(x);
// Array
let bars = [1, 2, 3, 4, 5, 6];
console.log(bars);
let nameBars = [["west"], ["east"]];
console.log(nameBars);
let what = "idk";
// Pointer?
let couz = [12, 34];
console.log(couz[0]); // get data
console.log(couz); // get first pointer but ref to array
couz[0] = 24; // like *(couz + 0) = 24;
console.log(couz[0]);
// Casting? maybe not! using Convert by right way
let j = "15";
// let j: unknown = "15"; // can using "unknown" but prefer using "any"
let w = j;
console.log(w, w + 2);
// DOM? using browser
// if (!Window) let Window: any = Object;
if ("Element" in globalThis) {
    console.log("start using dom");
    let div = document.createElement("div");
    console.log(div);
    console.dir(div);
}
;
class User {
    constructor() {
        this.legal = true;
        this.name = "Ahmad Asy SyafiQ";
        this.age = 19;
    }
    get getName() {
        return this.name;
    }
    get getAge() {
        return this.age;
    }
}
User.id = 0x3ef5ac7a8b4e;
let t = new User;
console.log(t.getName);
console.log(t.getAge);
console.log(t.legal);
console.log(User.id);
// Object ...
let Weird = (obj) => {
    let id = Number(Math.random() * 1e18).toString(16).slice(0, 12);
    return Object.assign(Object.assign({}, obj), { id });
};
let s = Weird({
    "name": "Udin"
});
console.log(s);
const bowl = {
    name: "BOWL",
    data: {
        meta: "KIT"
    }
};
console.log(bowl);
//# sourceMappingURL=main.js.map