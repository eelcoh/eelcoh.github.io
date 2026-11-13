const app = Elm.Main.init();

app.ports.downloadDiagram.subscribe(() => {
    const svg = document.querySelector('.local-diagram .sequence-svg');
    if (!svg) return;

    const exported = svg.cloneNode(true);
    const properties = [
        'fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linejoin',
        'stroke-linecap', 'font-family', 'font-size', 'font-weight',
    ];
    const originals = svg.querySelectorAll('[class]');
    exported.querySelectorAll('[class]').forEach((node, index) => {
        const computed = getComputedStyle(originals[index]);
        for (const property of properties) {
            node.style.setProperty(property, computed.getPropertyValue(property));
        }
    });

    // Put the background inside the SVG so it also appears in image viewers.
    const background = document.createElementNS(svg.namespaceURI, 'rect');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    background.setAttribute('fill', getComputedStyle(svg).backgroundColor);
    exported.prepend(background);

    const xml = new XMLSerializer().serializeToString(exported);
    const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sequence-diagram.svg';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
});

app.ports.copyOutput.subscribe(async (output) => {
    try {
        await navigator.clipboard.writeText(output);
        app.ports.copyResult.send(true);
    } catch {
        app.ports.copyResult.send(false);
    }
});

app.ports.preparePreview.subscribe(async ({ request, source }) => {
    try {
        const encoded = await encodePlantUml(source);
        const url = 'https://www.plantuml.com/plantuml/svg/' + encoded;
        app.ports.previewResult.send({ request, url });
    } catch {
        app.ports.previewResult.send({ request, url: null });
    }
});

async function encodePlantUml(source) {
    const bytes = new TextEncoder().encode(source);
    const hex = () => '~h' + Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    if (typeof CompressionStream === 'undefined') return hex();

    let stream;
    try {
        stream = new CompressionStream('deflate-raw');
    } catch {
        return hex();
    }

    const compressed = new Blob([bytes]).stream().pipeThrough(stream);
    const data = new Uint8Array(await new Response(compressed).arrayBuffer());
    let binary = '';
    for (const byte of data) binary += String.fromCharCode(byte);

    const standard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const plantUml = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
    return btoa(binary).replace(/[A-Za-z0-9+/=]/g, char => (
        char === '=' ? '0' : plantUml[standard.indexOf(char)]
    ));
}
