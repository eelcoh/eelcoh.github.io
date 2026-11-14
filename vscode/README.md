# Sequence Diagram for VS Code

To install a local build, run **Extensions: Install from VSIX…** in the Command Palette and select `dist/seqdiagram-0.2.0.vsix`.

Create a `.seq` file, then run **Sequence Diagram: Open Preview to the Side** from the Command Palette or use the preview button in the editor toolbar.

```text
sequence user
    browser: open dashboard
        api: load data
        audit [async]: record visit
```

The preview follows edits to the source file without sending it to a server. Parser errors appear in the editor and in Problems. The language mode uses four spaces for indentation and highlights declarations, participants, messages, and `[async]`.

Set the default preview theme and return arrows in the **Sequence Diagram** settings. Use **Theme…** in the preview to choose a preset or import a theme JSON for that file. File choices are saved in VS Code's workspace state. Choose **Use default theme** to clear the override.

Use **Copy image** to paste a PNG into another app, or **Copy SVG** to copy the vector source as text.

Build the VSIX from the site repository with `./build.sh --vscode ../plantuml-generator`. The build uses Elm 0.19.3 and Node.js with npm. The package includes the renderer and does not require a separate CLI.
