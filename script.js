function initializeExamples(containerSelector, examples) {
    const gridContainer = document.querySelector(containerSelector);

    examples.forEach((example, index) => {
        // Create example row container
        const exampleRow = document.createElement('div');
        exampleRow.className = 'example-row';

        // Add title and description
        const title = document.createElement('div');
        title.className = 'example-title';
        title.textContent = example.title;

        const description = document.createElement('div');
        description.className = 'example-description';
        description.textContent = example.description;

        exampleRow.appendChild(title);
        exampleRow.appendChild(description);

        // Create example content container
        const exampleContent = document.createElement('div');
        exampleContent.className = 'example-content';

        // Create CSS editor
        const cssEditor = document.createElement('div');
        cssEditor.className = 'css-editor';
        const textArea = document.createElement('textarea');
        textArea.id = `css-input-${index}`;
        textArea.value = example.css;
        cssEditor.appendChild(textArea);

        // Create HTML viewer
        const htmlViewer = document.createElement('div');
        htmlViewer.className = 'html-viewer';
        const iframe = document.createElement('iframe');
        iframe.id = `html-output-${index}`;
        iframe.srcdoc = `<html><head><style>${example.css}</style></head><body>${example.html}</body></html>`;
        htmlViewer.appendChild(iframe);

        // Append CSS editor and HTML viewer to content
        exampleContent.appendChild(cssEditor);
        exampleContent.appendChild(htmlViewer);

        // Append content to row
        exampleRow.appendChild(exampleContent);

        // Add row to container
        gridContainer.appendChild(exampleRow);

        // Add divider
        if (index < examples.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'divider';
            gridContainer.appendChild(divider);
        }

        // Add event listener for textarea
        textArea.addEventListener('input', () => {
            const styleTag = `<style>${textArea.value}</style>`;
            iframe.srcdoc = `<html><head>${styleTag}</head><body>${example.html}</body></html>`;
        });
    });
}
