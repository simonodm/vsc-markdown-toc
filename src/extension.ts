import * as vscode from 'vscode';
import { generateTableOfContentsCommand } from './commands/generateTableOfContentsCommand';

export function activate(context: vscode.ExtensionContext) {
	console.log('"vsc-markdown-toc" activated');

	let generateTOCCommand = vscode.commands.registerCommand('vsc-markdown-toc.generateTableOfContents', generateTableOfContentsCommand);

	context.subscriptions.push(generateTOCCommand);
}

export function deactivate() {}
