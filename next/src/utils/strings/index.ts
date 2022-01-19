import "./skeletons"

export class skStringMap extends Object implements IskStringMap {

	constructor() {

		super()
	}

	get digits(): string { return "0123456789" }
	get octdigits(): string { return this.digits.slice(0,8) }
	get ascii_lowercase(): string { return "abcdefghijklmnopqrstuvwxyz" }
	get ascii_uppercase(): string { return "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }
	get hexdigits(): string { return this.digits + this.ascii_lowercase.slice(0, 6) + this.ascii_uppercase.slice(0, 6) }
	get ascii_letters(): string { return this.ascii_lowercase + this.ascii_uppercase }
	get punctuation(): string { return "\!\"\#\$\%\&\\\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\\\]\^\_\`\{\|\}\~" }
	get whitespace(): string { return " \\t\\n\\r\\x0b\\x0c" }
	get printable(): string { return this.digits + this.ascii_lowercase + this.ascii_uppercase + this.punctuation + this.whitespace }
	get alphabet(): string { return this.digits + this.ascii_lowercase + this.ascii_uppercase }

}

export default class skString extends Object {

    constructor() {

        super()
    }
}