/*
    sk: skulluglify
*/

class skQueryEvent extends Event {

	constructor () {

		super("Query");

		this.detail = new Object;
		
	}
}

class skQuery extends EventTarget {

	constructor (target = null) {

		super();

		this.target = target;
		this.event = new skQueryEvent;

		this.dispatchEvent(this.event);
	}

    parseQueries (queries) {

	    const skQueryClone = this.constructor.bind(this); 
		switch (typeof queries) {
			case "string":

				if (queries.startsWith("!")) {

					queries = queries.slice(1);
					return new skQueryClone(document.createElement(queries));
				} else
				if (queries.endsWith("*")) {

					queries = queries.slice(0, queries.length -1);
					return Array.from(document.querySelectorAll(queries))
					.map((target) => new skQueryClone(target));
				} else {

					let element = document.querySelector(queries);
					if (!element) return new skQueryClone(document.createElement(queries));
					return new skQueryClone(element);
				}
				
				break;
			
			case "object":
			
				if (Array.isArray(queries)) {

					return queries.map((target) => this.parseQueries(target));
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
}

let q = new skQuery;
globalThis.query = q.parseQueries.bind(q);
