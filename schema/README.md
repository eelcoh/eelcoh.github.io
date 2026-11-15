# JSON Schema Viewer

Open the [web viewer](https://eelcoh.github.io/json-schema/) or `/json-schema/` on the local development server. Paste JSON Schema, OpenAPI, or Swagger in JSON format, open a file, or load the example. The viewer renders locally and follows local references where the upstream decoder supports them. References to other files or URLs are shown without fetching their targets.

Use **Collapse all** to start at the top level, then open nodes as needed. **Keep positions fixed** reserves room for hidden branches. Leave it off for larger documents, especially OpenAPI specs with many references. The SVG download reflects the visible nodes and the current theme. Theme JSON files can be shared with the CLI and VS Code preview.

## CLI

```sh
mise run build:schema-cli
./dist/jsonschema openapi.json --theme dark -o api.svg
./dist/jsonschema schema.json --collapse-all > overview.svg
cat schema.json | ./dist/jsonschema --theme-file schema-theme.json > schema.svg
```

The standalone executable targets the build machine. To cross-build, set `JSONSCHEMA_TARGET_NODE` to the absolute path to a target platform Node.js executable from the same Node.js release. `mise run build:schema-cli-js` produces `dist/jsonschema.cjs`.

## VS Code

Run `mise run build:schema-vscode` and install the generated `dist/jsonschema-0.1.0.vsix` with **Extensions: Install from VSIX…**. See the [extension README](vscode/README.md) for the preview command and controls.

## Build source

Place a checkout of [jsonschema-viewer](https://github.com/eelcoh/jsonschema-viewer) next to this repository, or set `JSONSCHEMA_SOURCE_DIR` to its path. The integration uses the decoder and layout from commit `f678af7cb57701b60f6a45166e05b05a47dd2145`. The build adapts a temporary copy of the renderer so the same node tree can be displayed in the browser or serialized as SVG for the CLI and extension.
