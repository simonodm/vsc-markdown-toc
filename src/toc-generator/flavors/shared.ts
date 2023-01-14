import { Header } from "../types";
import { createGitlabFlavorConfiguration } from "./gitlab";

export type MarkdownFlavor = 'gitlab';
export type HeaderIdFrequencyMap = Record<string, number>;

export type FlavorConfiguration = {
    flavor: MarkdownFlavor;
    parseHeader: (header: string) => Header | undefined;
    headerIdGenerator?: (headerName: string, frequencyMap?: HeaderIdFrequencyMap) => string;
    anchorGenerator?: (headerName: string, headerId: string) => string;
};

export function getFlavorConfiguration(flavor: MarkdownFlavor): FlavorConfiguration {
    switch(flavor) {
        case 'gitlab':
            return createGitlabFlavorConfiguration();
    }
}