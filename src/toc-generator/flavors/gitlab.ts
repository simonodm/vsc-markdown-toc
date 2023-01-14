import { FlavorConfiguration, Header, HeaderIdFrequencyMap } from "../types";

export function createGitlabFlavorConfiguration(): FlavorConfiguration {
    return {
        flavor: 'gitlab',
        parseHeader,
        headerIdGenerator,
        anchorGenerator
    };
}

function parseHeader(header: string): Header | undefined {
    const headerRegex = /^(?<prefix>#{1,6}) (?<name>.*)( \{#(<id>.+)\})?$/; // ###### Header
    const match = header.match(headerRegex);

    if(match?.groups) {
        return {
            name: match.groups.name,
            level: match.groups.prefix.length,
            customId: match.groups.id
        };
    }

    return undefined;
}

function headerIdGenerator(headerName: string, frequencyMap?: HeaderIdFrequencyMap): string {
    let headerId = headerName.toLowerCase().split(' ').join('-');
    if(frequencyMap === undefined) {
        return headerId;
    }

    if(!Object.prototype.hasOwnProperty.call(frequencyMap, headerId)) {
        frequencyMap[headerId] = 1;
        return headerId;
    }

    frequencyMap[headerId]++;
    return `${headerId}-${frequencyMap[headerId] - 1}`; 
}

function anchorGenerator(headerName: string, headerId: string): string {
    return `[${headerName}](#${headerId})`;
}