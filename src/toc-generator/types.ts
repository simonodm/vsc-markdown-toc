export type GeneratorConfiguration = {
    flavor: FlavorConfiguration;
    useNumberedEntries?: boolean;
};

export type Header = {
    name: string;
    level: number;
    customId?: string;
};

export type HeaderIdFrequencyMap = Record<string, number>;

export type MarkdownFlavor = 'gitlab';

export type FlavorConfiguration = {
    flavor: MarkdownFlavor;
    parseHeader: (header: string) => Header | undefined;
    headerIdGenerator?: (headerName: string, frequencyMap?: HeaderIdFrequencyMap) => string;
    anchorGenerator?: (headerName: string, headerId: string) => string;
};