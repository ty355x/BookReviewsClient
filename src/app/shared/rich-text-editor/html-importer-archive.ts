export class HtmlImporter {
    private lines: any = [];
    private printableNodes = ['BODY', 'SPAN', 'DIV', 'P', 'B', 'STRONG', 'I', 'EM', 'U'];
    private lastLineWasParagraph = false;

    private constructor() {
    }

    static import(html: string) {
        return new HtmlImporter().parseHtml(html);
    }

    private parseHtml(html: string) {
        const domParser = new DOMParser();
        const dom = domParser.parseFromString(html, 'text/html');
        this.processNode(dom.firstChild, null, null);

        return {'ops': this.lines};
    }

    private processNode(node: ChildNode|null, parentNode: ChildNode|null, parentStyles: any) {
        if (node === null) {
            return;
        }

        if (node.nodeName === 'P' && this.lines.length > 0 && !this.lastLineWasParagraph) {
            this.insertParagraph();
            this.lastLineWasParagraph = true;
        } else {
            this.lastLineWasParagraph= false;
        }

        let lineStyles = { bold: false, italic: false, underline: false };

        if (parentStyles !== null) {
            lineStyles = { bold: parentStyles.bold, italic: parentStyles.italic, underline: parentStyles.underline };
        }

        this.applyStyles(node, lineStyles);
        this.checkPrintNode(node, parentNode, lineStyles);

        node.childNodes.forEach((child: ChildNode) => {
            this.processNode(child, node, lineStyles);
        });

        if (node.nodeName === 'P') {
            this.insertParagraph();
        }
    }

    private checkPrintNode(node: ChildNode, parentNode: ChildNode|null, lineStyles: any) {
        if (parentNode === null || node.nodeName !== '#text' || node.nodeValue === null) {
            return;
        }

        if (!this.printableNodes.find(pn => pn === parentNode.nodeName)) {
            return;
        }

        this.addLine(node, lineStyles);
    }

    private addLine(node: ChildNode, lineStyles: any) {
        let text = '';

        if (node.nodeValue !== null) {
            let nodeValue = node.nodeValue;
            nodeValue = nodeValue.replaceAll('\n', ' ');

            if (node.parentNode !== null && node.parentNode.nodeName === 'P') {
                while (nodeValue.startsWith(' ')) {
                    nodeValue = nodeValue.substring(1, nodeValue.length);
                }
            }

            if (nodeValue !== '') {
                text += nodeValue + '';
            }
        }

        let line: any = { insert: text };

        if (lineStyles.bold || lineStyles.italic || lineStyles.underline) {
            line.attributes = {};

            if (lineStyles.bold) {
                line.attributes.bold = true;
            }

            if (lineStyles.italic) {
                line.attributes.italic = true;
            }

            if (lineStyles.underline) {
                line.attributes.underline = true;
            }
        }

        this.lines.push(line);
    }

    private insertParagraph() {
        this.lines.push({ insert: '\n' });
    }

    private applyStyles(node: ChildNode, lineStyles: any) {
        if (node.nodeName === 'B' || node.nodeName === 'strong') {
            lineStyles.bold = true;
        }

        if (node.nodeName === 'I' || node.nodeName === 'EM') {
            lineStyles.italic = true;
        }

        if (node.nodeName === 'U') {
            lineStyles.underline = true;
        }
    }
}
