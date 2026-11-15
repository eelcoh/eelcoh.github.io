const { readFileSync, writeFileSync } = require('node:fs');
const { parseArgs } = require('node:util');

async function run() {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: {
            output: { type: 'string', short: 'o' },
            theme: { type: 'string', short: 't' },
            'theme-file': { type: 'string' },
            'collapse-all': { type: 'boolean' },
            'expand-all': { type: 'boolean' },
            help: { type: 'boolean', short: 'h' },
        },
    });

    if (values.help) {
        process.stdout.write(`Usage: jsonschema [options] [file|-]

Render JSON Schema or an OpenAPI/Swagger JSON document to SVG offline.
Input and output default to stdin and stdout.

  -o, --output <file>    Write SVG to file
  -t, --theme <preset>   classic, monochrome, inverse-monochrome, dark,
                         or high-contrast-black
      --theme-file <file>  Use a theme exported by the viewer
      --collapse-all     Show the top-level nodes
      --expand-all       Expand all resolvable branches
  -h, --help             Show this help
`);
        return;
    }

    if (positionals.length > 1) throw new Error('Expected at most one input file.');
    if (values.theme !== undefined && values['theme-file'] !== undefined) {
        throw new Error('Choose either --theme or --theme-file.');
    }
    if (values['collapse-all'] && values['expand-all']) {
        throw new Error('Choose either --collapse-all or --expand-all.');
    }

    const input = positionals[0] ?? '-';
    const output = values.output ?? '-';
    const { ok, text } = await renderSchema({
        source: readFileSync(input === '-' ? 0 : input, 'utf8'),
        theme: values.theme ?? 'classic',
        themeJson: values['theme-file'] === undefined ? null : readFileSync(values['theme-file'], 'utf8'),
        mode: values['collapse-all'] ? 'overview' : values['expand-all'] ? 'expanded' : 'initial',
    });
    if (!ok) throw new Error(text);
    if (output === '-') process.stdout.write(text);
    else writeFileSync(output, text, 'utf8');
}

run().catch(error => {
    process.stderr.write(`jsonschema: ${error.message}\n`);
    process.exitCode = 1;
});
