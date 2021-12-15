import MarkdownIt from 'markdown-it';
import markdownItCheckbox from 'markdown-it-checkbox';

const copyToClipboardElement = () => {
    const div = document.createElement('div');
    div.classList.add('CopyCodeToClipboard');

    const button = document.createElement('button');
    button.textContent = 'copy';
    button.classList.add('CopyButton');

    const span = document.createElement('span');
    span.textContent = 'copiado!';
    span.classList.add('hiden');

    div.append(button, span);
    return div;
};

const addCopyToClipboard = (template = '') => {
    const div = document.createElement('div');
    div.innerHTML = template;
    for (let child of div.children) {
        if (child.tagName === 'PRE') {
            child.insertBefore(copyToClipboardElement(), child.children[0]);
        }
    }
    return div;
};

const parseHtml = (str) => {
    const markdown = new MarkdownIt({ html: true }).use(markdownItCheckbox);
    const parsedHTML = markdown.render(str);
    const htmlWithTarget = parsedHTML.toString().replace(/<a/gm, '<a target="__blank"');
    const htmlWithCopyButton = addCopyToClipboard(htmlWithTarget).outerHTML;
    return htmlWithCopyButton;
};

export default parseHtml;
