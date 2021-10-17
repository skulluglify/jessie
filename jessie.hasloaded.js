// module: disable

console.log(document.readyState);

window.addEventListener("DOMContentLoaded", e => {
	console.log(document.readyState, e);
}, true)

document.addEventListener("readystatechange", e => {
	console.log(document.readyState, e);
}, true)
