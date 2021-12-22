/*
 * sk: skulluglify
 * license: BSD new 3-Clause
 *
 * jessie.core
 * jessie.singleton
 */

// @ts-ignore
import c from "./test.toml"
// @ts-ignore
import d from "./test.yaml"
import e from "./test.json"

console.log(c)
console.log(d)
console.log(e)

document.body.innerText += (d?.name)
document.body.innerText += (e?.message)

interface jessieType {

	unSpaceText(context: string): string | null
	unQuote(context: string, sep?: boolean | null, keepQuote?: boolean | null): string | null
}

class jessieCore implements jessieType {

	unSpaceText(context: string): string | null {

		return null
	}

	unQuote(context: string, sep?: boolean | null, keepQuote?: boolean | null): string | null {

		return null
	}
}

export let jessie: jessieType = new jessieCore
