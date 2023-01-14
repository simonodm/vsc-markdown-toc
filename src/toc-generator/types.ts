import { FlavorConfiguration } from "./flavors/shared";

export type GeneratorConfiguration = {
    flavor: FlavorConfiguration;
    useNumberedEntries?: boolean;
};

export type Header = {
    name: string;
    level: number;
    customId?: string;
};