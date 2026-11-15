# Diagram Tools

The [home page](https://eelcoh.github.io/) shows examples of both tools. The site follows your system’s light or dark appearance.

- [Sequence Diagram Generator](https://eelcoh.github.io/sequence-diagram/) turns indented text into a sequence diagram as you type.
- [JSON Schema Viewer](https://eelcoh.github.io/json-schema/) makes JSON Schema and OpenAPI documents explorable. It also has a [CLI and VS Code extension](schema/README.md).

## Sequence diagram quick start

Click **Try an example** in the preview or paste this into the editor:

```text
sequence user
    browser: open dashboard
        api: load data
        audit [async]: record visit
```

Start with `sequence NAME` to name the first participant. Each indented line is a call to the named participant. Add `: message` to label the arrow, indent again for nested calls, and align calls at the same level when they share a caller. Use `[async]` after a participant name to omit that call’s return arrow. **Syntax help** in the editor includes another way to load this example.

## Explore and share a diagram

- Use **Collapse all** to show the main flow, then select activation bars to reveal details one level at a time. **Keep positions fixed** keeps visible elements in place as you unfold the flow.
- Open **Full screen** to present, zoom, or pan. **Download SVG** exports the current view with its theme.
- Pick a preset or use **Custom** to set colors, font, and participant corner radius. You can save and reload themes as JSON.
- Open the **PlantUML** menu for generated source or a preview from the public PlantUML server. The server receives the generated source when you request that preview.

## Use it outside the browser

- [Command-line tool](cli/README.md) for offline SVG or PlantUML export on macOS and Linux.
- [VS Code extension](vscode/README.md) for syntax highlighting, parser diagnostics, and an offline live preview of `.seq` files.

## Build with mise

Install [mise](https://mise.jdx.dev/) and place a checkout of [plantuml-generator](https://github.com/eelcoh/plantuml-generator) next to this repository. If it lives elsewhere, set `SEQDIAGRAM_GENERATOR_DIR` to its path before running a build. For the JSON Schema viewer, place a checkout of [jsonschema-viewer](https://github.com/eelcoh/jsonschema-viewer) alongside it or set `JSONSCHEMA_SOURCE_DIR`.

```sh
mise install
mise run build
mise run serve
```

Open [localhost:8000](http://localhost:8000/) after starting the server. Set `SEQDIAGRAM_PORT` to use a different port. You can also build individual targets:

- `mise run build:web` updates `main.js`.
- `mise run build:cli` creates `dist/seqdiagram` for the current platform.
- `mise run build:cli-js` creates `dist/seqdiagram.cjs`.
- `mise run build:vscode` packages the extension as a versioned VSIX in `dist/`.

Run `mise run build:schema` for all JSON Schema targets, or see the [individual build commands](schema/README.md).

See the [roadmap](ROADMAP.md) for the project’s feature list. The repository uses the [MIT License](LICENSE).
