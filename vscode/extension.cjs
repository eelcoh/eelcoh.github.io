const vscode = require('vscode');
const { randomBytes } = require('node:crypto');
const presets = [
    ['Classic', 'classic'],
    ['Monochrome', 'monochrome'],
    ['Inverse monochrome', 'inverse-monochrome'],
    ['Dark', 'dark'],
    ['High Contrast Black', 'high-contrast-black'],
];

function activatePreview(context, options) {
    const { language, title, example, render, supports, folding = false } = options;
    const prompt = `Open ${options.fileDescription} to use the ${title} preview.`;
    const isSupported = document => document && supports(document);
    const isTracked = document => isSupported(document) &&
        (!options.track || options.track(document) || previews.has(document.uri.toString()));
    const diagnostics = vscode.languages.createDiagnosticCollection(language);
    const previews = new Map();
    const pending = new Map();
    const themeKey = document => `${language}.theme:${document.uri.toString()}`;

    async function selectTheme(document) {
        if (!isSupported(document)) {
            await vscode.window.showInformationMessage(prompt);
            return;
        }
        const choices = [
            { label: 'Use default theme' },
            ...presets.map(([label, theme]) => ({ label, theme })),
            { label: 'Load theme JSON…', load: true },
        ];
        const choice = await vscode.window.showQuickPick(choices, { placeHolder: 'Choose a theme for this file' });
        if (!choice) return;

        let override = choice.theme ? { theme: choice.theme } : undefined;
        if (choice.load) {
            const files = await vscode.window.showOpenDialog({
                canSelectMany: false,
                filters: { 'Theme JSON': ['json'] },
                openLabel: 'Load theme',
            });
            if (!files?.length) return;
            try {
                const themeJson = new TextDecoder().decode(await vscode.workspace.fs.readFile(files[0]));
                const result = await render({ source: example, themeJson });
                if (!result.ok) throw new Error('Choose a valid diagram theme JSON file.');
                override = { themeJson };
            } catch (error) {
                await vscode.window.showErrorMessage(error.message);
                return;
            }
        }
        await context.workspaceState.update(themeKey(document), override);
        await refresh(document);
    }

    async function refresh(document) {
        const key = document.uri.toString();
        const version = document.version;
        const source = document.getText();
        const preview = previews.get(key);
        const override = context.workspaceState.get(themeKey(document));
        const settings = vscode.workspace.getConfiguration(language, document.uri);
        if (preview && preview.source !== source) {
            preview.source = source;
            preview.folding = { mode: 'initial', paths: new Set() };
        }
        const state = preview?.folding;
        const request = {
            source,
            theme: settings.get('theme', 'classic'),
            showReturns: settings.get('showReturns', true),
            ...override,
            ...(folding && state ? { mode: state.mode, paths: [...state.paths], interactive: true } : {}),
        };
        const result = source.trim()
            ? await render(request)
            : { ok: true, text: '' };

        if (document.isClosed || document.version !== version || !isSupported(document) || (preview && preview.folding !== state)) return;

        const problem = result.ok ? null : (options.diagnostic ?? parserDiagnostic)(document, result.text);
        if (problem) diagnostics.set(document.uri, [problem]);
        else diagnostics.delete(document.uri);

        if (preview && previews.get(key) === preview) {
            preview.request = result.ok && result.text ? request : null;
            preview.svg = result.ok ? result.text : '';
            preview.webview.html = previewHtml(result, title, folding);
        }
    }

    function report(error) {
        console.error(`[${language}]`, error);
    }

    function schedule(document) {
        const key = document.uri.toString();
        clearTimeout(pending.get(key));
        if (!isTracked(document)) return;
        pending.set(key, setTimeout(() => {
            pending.delete(key);
            refresh(document).catch(report);
        }, 120));
    }

    context.subscriptions.push(
        diagnostics,
        vscode.workspace.onDidOpenTextDocument(schedule),
        vscode.workspace.onDidChangeTextDocument(({ document }) => schedule(document)),
        vscode.workspace.onDidCloseTextDocument(document => {
            const key = document.uri.toString();
            clearTimeout(pending.get(key));
            pending.delete(key);
            diagnostics.delete(document.uri);
            previews.get(key)?.dispose();
        }),
        vscode.workspace.onDidChangeConfiguration(event => {
            if (!event.affectsConfiguration(language)) return;
            for (const document of vscode.workspace.textDocuments) {
                if (previews.has(document.uri.toString())) schedule(document);
            }
        }),
        vscode.commands.registerCommand(`${language}.selectTheme`, () =>
            selectTheme(vscode.window.activeTextEditor?.document)),
        vscode.commands.registerCommand(`${language}.openPreview`, async () => {
            const document = vscode.window.activeTextEditor?.document;
            if (!isSupported(document)) {
                await vscode.window.showInformationMessage(prompt);
                return;
            }

            const key = document.uri.toString();
            let panel = previews.get(key);
            if (panel) {
                panel.reveal(undefined, true);
            } else {
                const name = document.uri.path.split('/').pop();
                panel = vscode.window.createWebviewPanel(
                    `${language}.preview`, `${title}: ${name}`,
                    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
                    { enableScripts: true, localResourceRoots: [] },
                );
                previews.set(key, panel);
                const messages = panel.webview.onDidReceiveMessage(async message => {
                    try {
                        if (message?.action === 'theme') await selectTheme(document);
                        if (message?.action === 'fold' && folding && panel.request && typeof message.path === 'string') {
                            const paths = new Set(panel.folding.paths);
                            let mode = panel.folding.mode;
                            if (message.path === 'expand' || message.path === 'collapse') {
                                paths.clear();
                                mode = message.path === 'expand' ? 'expanded' : 'overview';
                            } else if (paths.has(message.path)) {
                                paths.delete(message.path);
                            } else {
                                paths.add(message.path);
                            }
                            panel.folding = { mode, paths };
                            await refresh(document);
                        }
                        if (message?.action === 'copySvg' && panel.svg) {
                            const svg = folding
                                ? (await render({ ...panel.request, interactive: false })).text
                                : panel.svg;
                            await vscode.env.clipboard.writeText(svg);
                            await panel.webview.postMessage({ status: 'SVG copied.' });
                        }
                    } catch (error) {
                        report(error);
                        await panel.webview.postMessage({ status: 'Action failed.' });
                    }
                });
                panel.onDidDispose(() => {
                    messages.dispose();
                    previews.delete(key);
                });
            }
            await refresh(document);
        }),
        { dispose() {
            for (const timer of pending.values()) clearTimeout(timer);
            for (const panel of previews.values()) panel.dispose();
        } },
    );

    vscode.workspace.textDocuments.forEach(schedule);
}

function parserDiagnostic(document, message) {
    const match = /^Line (\d+), column (\d+): (.*)$/s.exec(message);
    if (!match) return null;
    const line = document.lineAt(Math.max(0, Math.min(document.lineCount - 1, Number(match[1]) - 1)));
    const targetColumn = Number(match[2]) - 1;
    let column = 0;
    let visualColumn = 0;
    // Elm expands leading tabs to four-column stops before parsing.
    const indentation = /^[ \t]*/.exec(line.text)[0].length;
    while (column < indentation && visualColumn < targetColumn) {
        const width = line.text[column] === '\t' ? 4 - visualColumn % 4 : 1;
        if (visualColumn + width > targetColumn) break;
        visualColumn += width;
        column++;
    }
    if (column === indentation) {
        // Elm parser columns count Unicode code points while VS Code uses UTF-16 offsets.
        const prefix = Array.from(line.text.slice(column)).slice(0, targetColumn - visualColumn).join('');
        column += prefix.length;
    }
    const character = line.text.codePointAt(column);
    const end = character === undefined ? column : column + (character > 0xffff ? 2 : 1);
    const diagnostic = new vscode.Diagnostic(
        new vscode.Range(line.lineNumber, column, line.lineNumber, end),
        match[3],
        vscode.DiagnosticSeverity.Error,
    );
    diagnostic.source = 'seqdiagram';
    return diagnostic;
}

function previewHtml({ ok, text }, title, folding) {
    const nonce = randomBytes(18).toString('base64');
    const content = ok && text
        ? text
        : `<p>${escapeHtml(text || 'Enter a document to see its preview.')}</p>`;
    return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src blob:">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} preview</title>
<style>
    body { padding: 1rem; }
    svg { display: block; max-width: 100%; height: auto; margin-inline: auto; }
    p { white-space: pre-wrap; }
    nav { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; margin-bottom: 1rem; }
    button {
        padding: .35rem .65rem;
        color: var(--vscode-button-secondaryForeground);
        background: var(--vscode-button-secondaryBackground);
        border: 1px solid transparent;
        cursor: pointer;
    }
    button:hover { background: var(--vscode-button-secondaryHoverBackground); }
</style></head><body>
<nav aria-label="Preview actions">
<button id="theme">Theme…</button>
${folding && ok && text ? '<button data-action="collapse">Collapse all</button><button data-action="expand">Expand all</button>' : ''}
${ok && text ? '<button id="image">Copy image</button><button id="svg">Copy SVG</button>' : ''}
<span id="status" role="status"></span>
</nav>
${content}
<script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    const status = document.getElementById('status');
    document.getElementById('theme').onclick = () => vscode.postMessage({ action: 'theme' });
    document.getElementById('svg')?.addEventListener('click', () => vscode.postMessage({ action: 'copySvg' }));
    function sendFold(path) {
        vscode.postMessage({ action: 'fold', path });
    }
    document.addEventListener('click', event => {
        const control = event.target.closest('[data-fold], [data-action]');
        if (control) sendFold(control.dataset.fold ?? control.dataset.action);
    });
    document.addEventListener('keydown', event => {
        const control = event.target.closest('[data-fold]');
        if (control && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            if (!event.repeat) sendFold(control.dataset.fold);
        }
    });
    window.addEventListener('message', event => { status.textContent = event.data.status; });

    async function renderPng() {
        const svg = document.querySelector('svg');
        const width = Number(svg.getAttribute('width'));
        const height = Number(svg.getAttribute('height'));
        const scale = Math.min(2, 8192 / Math.max(width, height));
        const imageSvg = svg.cloneNode(true);
        imageSvg.style.maxWidth = 'none';
        imageSvg.style.height = height + 'px';
        const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(imageSvg)], { type: 'image/svg+xml' }));
        try {
            const image = new Image();
            image.src = url;
            await image.decode();
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(width * scale));
            canvas.height = Math.max(1, Math.round(height * scale));
            canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
            return await new Promise((resolve, reject) => {
                canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('PNG encoding failed')));
            });
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    document.getElementById('image')?.addEventListener('click', async () => {
        try {
            if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') throw new Error();
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': renderPng() })]);
            status.textContent = 'Image copied.';
        } catch {
            status.textContent = 'Could not copy the image. Copy SVG is available.';
        }
    });
</script></body></html>`;
}

function escapeHtml(value) {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function activate(context) {
    const { renderSequence } = require('./renderer.cjs');
    activatePreview(context, {
        language: 'seqdiagram',
        title: 'Diagram',
        example: 'sequence user',
        fileDescription: 'a .seq file',
        render: renderSequence,
        supports: document => document.languageId === 'seqdiagram',
    });
}

module.exports = { activate, activatePreview };
