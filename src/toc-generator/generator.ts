import { GeneratorConfiguration, Header } from "./types";

type HeaderTreeNode = {
    header: Header;
    parent?: HeaderTreeNode;
    children: HeaderTreeNode[];
};

type GeneratorContext = {
    configuration: GeneratorConfiguration;
    roots: HeaderTreeNode[];
    previousNode?: HeaderTreeNode;
    headerIdFrequencyMap: Record<string, number>;
};

export function generateTableOfContents(fileContent: string, configuration: GeneratorConfiguration): string {
    let context = createContext(configuration);

    const lines = fileContent.split(/\r?\n/g);

    lines.forEach(line => {
        context = processLine(line, context);
    });

    console.log(context);

    return getTableOfContents(context).join('\n');
}

function createContext(configuration: GeneratorConfiguration): GeneratorContext {
    return {
        configuration,
        roots: [],
        headerIdFrequencyMap: {}
    };
}

function processLine(line: string, context: GeneratorContext): GeneratorContext {
    const parsedHeader = context.configuration.flavor.parseHeader(line);
    if(!parsedHeader) {
        return context;
    }

    return getNextContext(parsedHeader, context);
}

function getNextContext(header: Header, previousContext: GeneratorContext): GeneratorContext {
    const treeNode: HeaderTreeNode = {
        header,
        children: []
    };

    const newRoots = [...previousContext.roots];

    const parent = findParent(header, previousContext);
    if(parent) {
        addToParent(treeNode, parent);
    } else {
        newRoots.push(treeNode);
    }

    return {
        ...previousContext,
        roots: newRoots,
        previousNode: treeNode,
    };
}

function findParent(header: Header, context: GeneratorContext): HeaderTreeNode | undefined {
    let current = context.previousNode;
    while(current && current.header.level >= header.level) {
        current = current.parent;
    }

    return current;
}

function addToParent(treeNode: HeaderTreeNode, parent: HeaderTreeNode): void {
    parent.children.push(treeNode);
    treeNode.parent = parent;
}

function generateEntry(header: Header, context: GeneratorContext, index: number, indent: number): string {
    const tabPrefix = getTabPrefix(indent);
    const headerBullet = getHeaderBullet(context.configuration, index);
    let headerEntry = tabPrefix + headerBullet;
    if(context.configuration.flavor.headerIdGenerator && context.configuration.flavor.anchorGenerator) {
        const headerId = context.configuration.flavor.headerIdGenerator(header.name, context.headerIdFrequencyMap);
        const anchor = context.configuration.flavor.anchorGenerator(header.name, headerId);
        headerEntry += anchor;
    } else {
        headerEntry += header.name;
    }
    

    return headerEntry;
}

function getTabPrefix(indent: number): string {
    return '\t'.repeat(indent);
}

function getHeaderBullet(configuration: GeneratorConfiguration, index: number): string {
    return configuration.useNumberedEntries ? `${index + 1}. ` : '* ';
}

function getTableOfContents(context: GeneratorContext): string[] {
    return context.roots.reduce<string[]>(
        (prev, root, index) =>
            [...prev, ...convertTreeToTableOfContents(root, context, index)],
        []);
}

function convertTreeToTableOfContents(root: HeaderTreeNode, context: GeneratorContext, index: number = 0, indent: number = 0): string[] {
    let result = [generateEntry(root.header, context, index, indent)];

    root.children.forEach((child, childIndex) => {
        result = [...result, ...convertTreeToTableOfContents(child, context, childIndex, indent + 1)];
    });

    return result;
}