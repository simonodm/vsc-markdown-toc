import * as vscode from 'vscode';
import { getFlavorConfiguration } from '../toc-generator/flavors/shared';
import { generateTableOfContents } from '../toc-generator/generator';
import { GeneratorConfiguration } from '../toc-generator/types';

export function generateTableOfContentsCommand() {
    vscode.window.showInformationMessage('"generateTableOfContents" triggered');

    const currentTextEditor = vscode.window.activeTextEditor;
    const currentTextDocument = currentTextEditor?.document;
    const generatorConfig = loadGeneratorConfiguration();

    if(currentTextEditor && currentTextDocument) {
        const contents = currentTextDocument.getText();
        const tableOfContents = generateTableOfContents(contents, generatorConfig);

        insertIntoEditor(currentTextEditor, tableOfContents);
    }
}

function loadGeneratorConfiguration(): GeneratorConfiguration {
    const configuration = vscode.workspace.getConfiguration();

    return {
        useNumberedEntries: configuration.get<boolean>('vsc-markdown-toc.useNumberedEntries') ?? true,
        flavor: getFlavorConfiguration('gitlab')
    };
}

function insertIntoEditor(textEditor: vscode.TextEditor, text: string): void {
    textEditor.edit(e => {
        e.insert(textEditor.selection.active, text);
    });
}