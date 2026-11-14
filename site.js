const app = Elm.Main.init();

app.ports.downloadDiagram.subscribe(() => {
    const svg = document.querySelector('.local-diagram .sequence-svg');
    if (svg) saveDiagram(svg);
});

function saveDiagram(svg) {
    const exported = svg.cloneNode(true);
    // The viewer's inline dimensions reflect the current zoom.
    exported.style.removeProperty('width');
    exported.style.removeProperty('height');
    const properties = [
        'fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linejoin',
        'stroke-linecap', 'paint-order', 'font-family', 'font-size', 'font-weight',
    ];
    const originals = svg.querySelectorAll('[class]');
    exported.querySelectorAll('[class]').forEach((node, index) => {
        const computed = getComputedStyle(originals[index]);
        for (const property of properties) {
            node.style.setProperty(property, computed.getPropertyValue(property));
        }
    });

    // Put the background inside the SVG so it also appears in image viewers.
    const background = document.createElementNS(svg.namespaceURI, 'rect');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    background.setAttribute('fill', getComputedStyle(svg).backgroundColor);
    exported.prepend(background);

    const xml = new XMLSerializer().serializeToString(exported);
    const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sequence-diagram.svg';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

app.ports.copyOutput.subscribe(async (output) => {
    try {
        await navigator.clipboard.writeText(output);
        app.ports.copyResult.send(true);
    } catch {
        app.ports.copyResult.send(false);
    }
});

app.ports.preparePreview.subscribe(async ({ request, source }) => {
    try {
        const encoded = await encodePlantUml(source);
        const url = 'https://www.plantuml.com/plantuml/svg/' + encoded;
        app.ports.previewResult.send({ request, url });
    } catch {
        app.ports.previewResult.send({ request, url: null });
    }
});

async function encodePlantUml(source) {
    const bytes = new TextEncoder().encode(source);
    const hex = () => '~h' + Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    if (typeof CompressionStream === 'undefined') return hex();

    let stream;
    try {
        stream = new CompressionStream('deflate-raw');
    } catch {
        return hex();
    }

    const compressed = new Blob([bytes]).stream().pipeThrough(stream);
    const data = new Uint8Array(await new Response(compressed).arrayBuffer());
    let binary = '';
    for (const byte of data) binary += String.fromCharCode(byte);

    const standard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const plantUml = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
    return btoa(binary).replace(/[A-Za-z0-9+/=]/g, char => (
        char === '=' ? '0' : plantUml[standard.indexOf(char)]
    ));
}

app.ports.openDiagramViewer.subscribe(() => {
    const preview = document.querySelector('.local-diagram .sequence-svg');
    if (!preview) return;

    const opener = document.activeElement;
    const diagram = preview.cloneNode(true);
    const dialog = document.createElement('dialog');
    dialog.className = 'diagram-viewer';
    dialog.setAttribute('aria-labelledby', 'diagram-viewer-title');
    dialog.innerHTML = `
        <header class="diagram-viewer-header">
            <h2 id="diagram-viewer-title">Sequence diagram</h2>
            <div class="diagram-tools" role="group" aria-label="Diagram zoom">
                <button type="button" data-action="out" aria-label="Zoom out">−</button>
                <output aria-live="polite"></output>
                <button type="button" data-action="in" aria-label="Zoom in">+</button>
                <button type="button" data-action="actual">Actual size</button>
                <button type="button" data-action="fit" aria-pressed="true">Fit to screen</button>
            </div>
            <button type="button" data-action="download">Download SVG</button>
            <button type="button" data-action="close" autofocus>Close</button>
        </header>
        <div class="diagram-viewer-viewport local-diagram" tabindex="0" aria-label="Diagram canvas">
            <div class="diagram-viewer-stage"></div>
        </div>`;

    const viewport = dialog.querySelector('.diagram-viewer-viewport');
    const stage = dialog.querySelector('.diagram-viewer-stage');
    const readout = dialog.querySelector('output');
    const zoomOut = dialog.querySelector('[data-action="out"]');
    const zoomIn = dialog.querySelector('[data-action="in"]');
    const fitButton = dialog.querySelector('[data-action="fit"]');
    const width = Number(diagram.getAttribute('width'));
    const height = Number(diagram.getAttribute('height'));
    let scale = 1;
    let fitted = true;
    let drag;

    stage.append(diagram);
    document.querySelector('.page').append(dialog);
    dialog.showModal();

    function zoom(nextScale) {
        const centerX = stage.clientWidth / 2 - viewport.scrollLeft;
        const centerY = stage.clientHeight / 2 - viewport.scrollTop;
        const offsetX = (viewport.clientWidth / 2 - centerX) / scale;
        const offsetY = (viewport.clientHeight / 2 - centerY) / scale;

        scale = nextScale;
        diagram.style.width = `${width * scale}px`;
        diagram.style.height = `${height * scale}px`;
        viewport.scrollLeft = stage.clientWidth / 2 + offsetX * scale - viewport.clientWidth / 2;
        viewport.scrollTop = stage.clientHeight / 2 + offsetY * scale - viewport.clientHeight / 2;
        readout.value = `${Math.round(scale * 100)}%`;
        fitButton.setAttribute('aria-pressed', String(fitted));
        zoomOut.disabled = scale <= .1;
        zoomIn.disabled = scale >= 4;
    }

    function fit() {
        const availableWidth = Math.max(1, viewport.clientWidth - 32);
        const availableHeight = Math.max(1, viewport.clientHeight - 32);
        zoom(Math.min(availableWidth / width, availableHeight / height));
        viewport.scrollTo(0, 0);
    }

    dialog.addEventListener('click', event => {
        switch (event.target.dataset.action) {
            case 'out':
                fitted = false;
                zoom(scale > 4 ? scale / 1.25 : Math.max(.1, scale / 1.25));
                break;
            case 'in':
                fitted = false;
                zoom(Math.min(4, scale * 1.25));
                break;
            case 'actual':
                fitted = false;
                zoom(1);
                break;
            case 'fit':
                fitted = true;
                fit();
                break;
            case 'download':
                saveDiagram(diagram);
                break;
            case 'close':
                dialog.close();
                break;
        }
    });

    viewport.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch' || event.button !== 0 || !stage.contains(event.target)) return;
        if (viewport.scrollWidth <= viewport.clientWidth && viewport.scrollHeight <= viewport.clientHeight) return;
        viewport.focus({ preventScroll: true });
        viewport.setPointerCapture(event.pointerId);
        drag = { id: event.pointerId, x: event.clientX + viewport.scrollLeft, y: event.clientY + viewport.scrollTop };
        viewport.classList.add('is-dragging');
    });

    viewport.addEventListener('pointermove', event => {
        if (drag?.id !== event.pointerId) return;
        viewport.scrollTo(drag.x - event.clientX, drag.y - event.clientY);
    });

    viewport.addEventListener('lostpointercapture', event => {
        if (drag?.id !== event.pointerId) return;
        drag = undefined;
        viewport.classList.remove('is-dragging');
    });

    const observer = new ResizeObserver(() => {
        if (fitted) fit();
    });
    observer.observe(viewport);
    dialog.addEventListener('close', () => {
        observer.disconnect();
        dialog.remove();
        opener?.focus();
    }, { once: true });

    fit();
});
