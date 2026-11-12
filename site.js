const app = Elm.Main.init();

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
