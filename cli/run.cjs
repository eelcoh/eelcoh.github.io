const { readFileSync, writeFileSync } = require('node:fs');
const { parseArgs } = require('node:util');

const help = `Usage: seqdiagram [options] [file|-]

Read a sequence from a file or stdin and write to stdout by default.

  -f, --format <format>   svg (default) or plantuml
  -o, --output <file>     Write to file, or use - for stdout
  -t, --theme <preset>    classic, monochrome, inverse-monochrome, dark,
                          or high-contrast-black (SVG only)
      --theme-file <file> Load a theme JSON exported by the website (SVG only)
      --no-returns        Hide return arrows
      --plantuml-monochrome
                          Include the monochrome skin in PlantUML output
  -h, --help              Show this help
`;

async function run() {
    const { values, positionals } = parseArgs({
        allowPositionals: true,
        options: {
            format: { type: 'string', short: 'f' },
            output: { type: 'string', short: 'o' },
            theme: { type: 'string', short: 't' },
            'theme-file': { type: 'string' },
            'no-returns': { type: 'boolean' },
            'plantuml-monochrome': { type: 'boolean' },
            help: { type: 'boolean', short: 'h' },
        },
    });

    if (values.help) {
        process.stdout.write(help);
        return;
    }

    if (positionals.length > 1) throw new Error('Expected at most one input file.');
    const input = positionals[0] ?? '-';
    const output = values.output ?? '-';
    const format = values.format ?? (output.endsWith('.puml') ? 'plantuml' : 'svg');
    if (format !== 'svg' && format !== 'plantuml') throw new Error(`Unknown output format: ${format}`);
    if (values.theme !== undefined && values['theme-file'] !== undefined) {
        throw new Error('Choose either --theme or --theme-file.');
    }
    if (format !== 'svg' && (values.theme !== undefined || values['theme-file'] !== undefined)) {
        throw new Error('Diagram themes apply to SVG output.');
    }
    if (format !== 'plantuml' && values['plantuml-monochrome']) {
        throw new Error('--plantuml-monochrome requires PlantUML output.');
    }

    const { ok, text } = await renderSequence({
        source: readFileSync(input === '-' ? 0 : input, 'utf8').replace(/^\uFEFF/, ''),
        format,
        theme: values.theme ?? 'classic',
        themeJson: values['theme-file'] === undefined ? null : readFileSync(values['theme-file'], 'utf8'),
        showReturns: !values['no-returns'],
        plantUmlMonochrome: Boolean(values['plantuml-monochrome']),
    });

    if (!ok) throw new Error(text);
    if (output === '-') process.stdout.write(text);
    else writeFileSync(output, text, 'utf8');
}

function fail(error) {
    process.stderr.write(`seqdiagram: ${error.message}\n`);
    process.exitCode = 1;
}

run().catch(fail);
