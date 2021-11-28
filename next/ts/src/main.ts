
let say: string = "say globe!";
let age: number = 12;

enum Log {
	Error,
	Log,
	Warn
};

interface Test {

	message: string,
	age?: number,
	print(): void
};

let a: Test = { "message": say, "age": age, print() {
	console.log(this.message, this.age);
}};

let b: Test = { "message": say, print() {} };

let c: Test = { "message": say, "age": 15, print() {
	console.log(this.message, this.age);
}};

a.print();
c.print();

console.log(a, b.message);

// Type & Union

type Yoi = {

	say: string,
	age: number
};

type Yoink = string | number | null;

let x: Yoink = "15";
x = 15;

console.log(x);

// Array

let bars: number[] = [1, 2, 3, 4, 5, 6];

console.log(bars);

let nameBars: string[][] = [["west"], ["east"]];

console.log(nameBars);

let what: any = "idk";

// Pointer?

let couz: number[] = [12, 34];

console.log(couz[0]); // get data
console.log(couz); // get first pointer but ref to array
couz[0] = 24; // like *(couz + 0) = 24;
console.log(couz[0]);


// Casting? maybe not! using Convert by right way

let j: any = "15";
// let j: unknown = "15"; // can using "unknown" but prefer using "any"
let w: number = j as number;

console.log(w, w + 2);  

// DOM? using browser

// if (!Window) let Window: any = Object;

if ("Element" in globalThis as Object | Window) {

	console.log("start using dom" as string);

	let div: Element = document.createElement("div") as Element;

	console.log(div);
	console.dir(div);
}


// Classes

interface UserAbstract {

	getName: string,
	getAge: number
};

class User implements UserAbstract {

	public readonly legal: boolean;
	
	private name: string;
	private age: number;

	public static readonly id: number = 0x3ef5ac7a8b4e;

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

let t: User = new User;

console.log(t.getName);
console.log(t.getAge);
console.log(t.legal);
console.log(User.id);

// Object ...

let Weird = (obj: Object): Object => {
	let id: string = Number(Math.random() * 1e18).toString(16).slice(0, 12);
	return {
		...obj,
		id
	};
};

let s: any = Weird({
	"name": "Udin"
});

console.log(s as Object);

// template

interface Herf<T> {
	name: string,
	data: T
}

const bowl: Herf<{ meta: string }> = {
	name: "BOWL",
	data: {
		meta: "KIT"
	}
};

console.log(bowl);
