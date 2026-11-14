// This adapter is bundled after the compiled Elm worker and shared styles.
function renderSequence(flags) {
    return new Promise(resolve => {
        const worker = elmModule.Elm.Cli.init({
            flags: {
                format: 'svg',
                theme: 'classic',
                themeJson: null,
                showReturns: true,
                plantUmlMonochrome: false,
                ...flags,
                stylesheet: diagramStyles,
            },
        });
        worker.ports.result.subscribe(resolve);
    });
}

module.exports = { renderSequence };
