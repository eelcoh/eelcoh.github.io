const indentWidth = 4;
const editor = document.getElementById('source');
const highlight = editor.previousElementSibling;

function syncHighlight() {
    highlight.scrollTop = editor.scrollTop;
    highlight.scrollLeft = editor.scrollLeft;
}

editor.addEventListener('scroll', syncHighlight);
editor.addEventListener('input', () => requestAnimationFrame(syncHighlight));

function indentation(line) {
    return line.match(/^[ \t]*/)[0];
}

function column(text) {
    let width = 0;
    for (const character of text) {
        width += character === '\t' ? indentWidth - width % indentWidth : 1;
    }
    return width;
}

function previousIndent(prefix) {
    const target = Math.floor((column(prefix) - 1) / indentWidth) * indentWidth;
    let end = prefix.length;
    while (end > 0 && column(prefix.slice(0, end)) > target) end--;
    return prefix.slice(0, end);
}

function replace(start, end, text, selectionStart, selectionEnd = selectionStart) {
    const direction = editor.selectionDirection;
    editor.setSelectionRange(start, end);

    // Keep keyboard edits in the browser's undo history where supported.
    const edited = text ? document.execCommand('insertText', false, text) : document.execCommand('delete');
    if (!edited) {
        editor.setRangeText(text, start, end);
        editor.dispatchEvent(new Event('input', { bubbles: true }));
    }

    editor.setSelectionRange(selectionStart, selectionEnd, direction);
}

function changeLineIndents(start, end, outdent) {
    const source = editor.value;
    const first = source.slice(0, start).lastIndexOf('\n') + 1;
    const lastBreak = source.indexOf('\n', end > start ? end - 1 : end);
    const last = lastBreak === -1 ? source.length : lastBreak;
    const lines = source.slice(first, last).split('\n');

    const changes = lines.map(line => {
        const prefix = indentation(line);
        const updated = outdent ? previousIndent(prefix) : ' '.repeat(indentWidth) + prefix;
        return { line: updated + line.slice(prefix.length), delta: updated.length - prefix.length };
    });
    const delta = changes.reduce((sum, change) => sum + change.delta, 0);
    if (outdent && delta === 0) return;

    const nextStart = Math.max(first, start + changes[0].delta);
    const nextEnd = Math.max(nextStart, end + delta);
    replace(first, last, changes.map(change => change.line).join('\n'), nextStart, nextEnd);
}

function continueIndent(event) {
    const start = editor.selectionStart;
    const before = editor.value.slice(0, start);
    const prefix = indentation(before.slice(before.lastIndexOf('\n') + 1));
    if (prefix.length === 0) return;

    event.preventDefault();
    const text = '\n' + prefix;
    replace(start, editor.selectionEnd, text, start + text.length);
}

let leaveOnTab = false;
editor.addEventListener('blur', () => { leaveOnTab = false; });
editor.addEventListener('beforeinput', event => {
    if (!event.isComposing && event.cancelable && ['insertLineBreak', 'insertParagraph'].includes(event.inputType)) {
        continueIndent(event);
    }
});

editor.addEventListener('keydown', event => {
    if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Escape') {
        leaveOnTab = true;
        return;
    }
    const leave = leaveOnTab;
    leaveOnTab = false;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const source = editor.value;
    const before = source.slice(0, start);
    const lineStart = before.lastIndexOf('\n') + 1;
    const beforeCursor = before.slice(lineStart);

    if (event.key === 'Enter') {
        continueIndent(event);
    } else if (event.key === 'Tab' && !leave) {
        event.preventDefault();
        if (event.shiftKey || source.slice(start, end).includes('\n')) {
            changeLineIndents(start, end, event.shiftKey);
        } else {
            const spaces = indentWidth - column(beforeCursor) % indentWidth;
            replace(start, end, ' '.repeat(spaces), start + spaces);
        }
    } else if (event.key === 'Backspace' && start === end && beforeCursor && beforeCursor === indentation(beforeCursor)) {
        event.preventDefault();
        const next = lineStart + previousIndent(beforeCursor).length;
        replace(next, start, '', next);
    }
});
