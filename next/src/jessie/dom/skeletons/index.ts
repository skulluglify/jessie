interface IskJessieDocumentModule {

    get elementAvailables(): Array<string>
    get styleAvailables(): Array<string>
}

interface IskJessieDocumentModuleTokenList {

    add(...tokens: Array<string>): void
    contains(token: string): boolean
    item(index: number): string | null
    remove(...tokens: Array<string>): void
    replace(token: string, newToken: string): boolean
    supports(token: string): boolean
    toggle(token: string, force?: boolean): boolean
    entries(): IterableIterator<[number, string]>
    keys(): IterableIterator<number>
    values(): IterableIterator<string>
    [Symbol.iterator](): IterableIterator<string>
}

interface IskJessieElementStructure {

    nodeName: string
    attributes: object
    children: Array<IskJessieElementStructure>
    dataset: object // data-<key>="<value>"
    classList: IskJessieDocumentModuleTokenList,
    style: object // support style embeded
}

type skJessieElementStructureType = IskJessieElementStructure