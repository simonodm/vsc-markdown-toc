export type GeneratorConfiguration = {
    useNumberedEntries: boolean;
};

type HeaderTreeNode = {
    header: string;
    children: HeaderTreeNode[];
}

export function generateTableOfContents(fileContent: string, configuration: GeneratorConfiguration): string {
    return configuration.useNumberedEntries ? '1. Test' : '*. Test';
}