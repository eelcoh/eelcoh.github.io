# JSON Schema Diagram for VS Code

Open a JSON Schema, OpenAPI or Swagger document saved as JSON. Run **JSON Schema: Open Diagram to the Side** from the Command Palette or use the preview button in the editor toolbar.

The offline preview updates as you edit. Click a node to toggle it, or use **Collapse all** and walk through a document one branch at a time. Press Enter or Space to toggle the focused node. **Theme…** picks a theme for the current file or imports a website theme JSON. Set the default under **JSON Schema Diagram**. **Copy image** copies a PNG, and **Copy SVG** copies the vector source.

Install the VSIX with **Extensions: Install from VSIX…**. From the site repository, `mise run build:schema-vscode` builds the package.
