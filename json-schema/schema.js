const app = Elm.SchemaMain.init({ flags: matchMedia('(prefers-color-scheme: dark)').matches });

setupDiagramViewer(app, {
    title: 'JSON Schema diagram',
    filename: 'json-schema.svg',
    themeFilename: 'schema-theme.json',
});

document.getElementById('schema-file').addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        app.ports.sourceFile.send({ ok: true, text: await file.text() });
    } catch {
        app.ports.sourceFile.send({ ok: false, text: 'Could not read the JSON file.' });
    }
    event.target.value = '';
});
