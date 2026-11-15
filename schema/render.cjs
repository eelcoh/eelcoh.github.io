// Bundled after the Elm worker. The CLI and VS Code use this same renderer.
function renderSchema(flags) {
    return new Promise(resolve => {
        const worker = elmModule.Elm.SchemaCli.init({
            flags: {
                theme: 'classic',
                themeJson: null,
                mode: 'initial',
                fixed: false,
                paths: [],
                interactive: false,
                ...flags,
            },
        });
        worker.ports.result.subscribe(resolve);
    });
}

module.exports = { renderSchema };
