const { readFileSync, writeFileSync } = require('node:fs');
const [elm, css, renderer, output, entry] = process.argv.slice(2);
const stylesheet = JSON.stringify(readFileSync(css, 'utf8'));
writeFileSync(output, [
    'const elmModule = {};',
    '(function () {',
    readFileSync(elm, 'utf8'),
    '}).call(elmModule);',
    `const diagramStyles = ${stylesheet};`,
    readFileSync(renderer, 'utf8'),
    entry ? readFileSync(entry, 'utf8') : '',
].join('\n'));
