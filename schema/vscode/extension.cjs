const vscode = require('vscode');
const { activatePreview } = require('./shared-extension.cjs');
const { renderSchema } = require('./renderer.cjs');

function activate(context) {
    activatePreview(context, {
        language: 'jsonschema',
        title: 'Schema diagram',
        example: '{"type":"object"}',
        fileDescription: 'a JSON Schema or OpenAPI JSON file',
        render: renderSchema,
        supports: document => ['json', 'jsonc'].includes(document.languageId),
        track: document => /(?:\.schema|(?:^|\/)(?:openapi|swagger|schema))\.json$/i.test(document.uri.path),
        diagnostic,
        folding: true,
    });
}

function diagnostic(document, message) {
    const source = document.getText();
    const bom = Number(source.startsWith('\uFEFF'));
    let position = 0;
    try {
        JSON.parse(source.slice(bom));
    } catch (error) {
        const offset = /\bposition (\d+)/.exec(error.message);
        const token = /^Unexpected token '(.)'/s.exec(error.message)?.[1];
        if (offset) position = Number(offset[1]) + bom;
        else if (/unexpected end/i.test(error.message)) position = source.length;
        else if (token && source.indexOf(token) === source.lastIndexOf(token)) {
            position = Math.max(0, source.indexOf(token));
        }
        message = error.message;
    }

    const start = document.positionAt(position);
    const end = document.positionAt(Math.min(source.length, position + 1));
    const result = new vscode.Diagnostic(new vscode.Range(start, end), message, vscode.DiagnosticSeverity.Error);
    result.source = 'jsonschema';
    return result;
}

module.exports = { activate };
