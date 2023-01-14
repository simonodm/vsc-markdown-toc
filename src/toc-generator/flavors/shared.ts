import { FlavorConfiguration, MarkdownFlavor } from "../types";
import { createGitlabFlavorConfiguration } from "./gitlab";

export function getFlavorConfiguration(flavor: MarkdownFlavor): FlavorConfiguration {
    switch(flavor) {
        case 'gitlab':
            return createGitlabFlavorConfiguration();
    }
}