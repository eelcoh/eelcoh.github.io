const app = Elm.Main.init();

app.ports.copyOutput.subscribe(async (output) => {
    try {
        await navigator.clipboard.writeText(output);
        app.ports.copyResult.send(true);
    } catch {
        app.ports.copyResult.send(false);
    }
});
