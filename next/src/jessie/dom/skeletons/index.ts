interface IskJessieDocumentModule {

    get elementAvailables(): Array<string>;
    get styleAvailables(): Array<string>;
}

interface IskJessieDocumentModuleTokenList {

    add(...tokens: Array<string>): void;
    contains(token: string): boolean;
    item(index: number): string | null;
    remove(...tokens: Array<string>): void;
    replace(token: string, newToken: string): boolean;
    supports(token: string): boolean;
    toggle(token: string, force?: boolean): boolean;
    entries(): IterableIterator<[number, string]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<string>;
}

class skJessieDocumentModuleTokenList extends Array<string> implements IskJessieDocumentModuleTokenList {
    
    [index: number]: string;
    
    add(...tokens: Array<string>): void {
        throw new Error("Method not implemented.");
    }
    
    contains(token: string): boolean {
        throw new Error("Method not implemented.");
    }
    
    item(index: number): string | null {
        throw new Error("Method not implemented.");
    }
    
    remove(...tokens: Array<string>): void {
        throw new Error("Method not implemented.");
    }
    
    replace(token: string, newToken: string): boolean {
        throw new Error("Method not implemented.");
    }
    
    supports(token: string): boolean {
        throw new Error("Method not implemented.");
    }
    
    toggle(token: string, force?: boolean): boolean {
        throw new Error("Method not implemented.");
    }
    
    entries(): IterableIterator<[number, string]> {
        throw new Error("Method not implemented.");
    }
    
    keys(): IterableIterator<number> {
        throw new Error("Method not implemented.");
    }
    
    values(): IterableIterator<string> {
        throw new Error("Method not implemented.");
    }
    
    [Symbol.iterator](): IterableIterator<string> {
        throw new Error("Method not implemented.");
    }
}

interface IskJessieElementStructure {

    nodeName: string;
    attributes: object;
    children: Array<IskJessieElementStructure>;
    dataset: object; // data-<key>="<value>"
    classList: DOMTokenList,
    style: object; // support style embeded
}

type skJessieElementStructureType = IskJessieElementStructure;