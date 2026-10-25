import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-rich-text',
    templateUrl: './rich-text.component.html',
    styleUrls: ['./rich-text.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class RichTextComponent implements OnChanges {
    @Input('content') content: any;
    @Input ('isChapterContent') isChapterContent: boolean = false;
    contentDisplay: any = null;
    private escaper: any = null;
    private paragraphOpeningTag = '<p>';

    ngOnChanges(changes: SimpleChanges): void {
        this.showContent();
    }

    private showContent() {
        this.contentDisplay = '';
        const contentObj = this.getContentAsObject();

        if (contentObj === null) {
            return;
        }

        if (!contentObj.hasOwnProperty('ops')) {
            return;
        }

        this.initEscaper();

        this.contentDisplay += this.paragraphOpeningTag;

        for (const line of contentObj.ops) {
            if (line.hasOwnProperty('insert')) {
                this.addLine(line);
            }
        }

        if (this.isChapterContent) {
            this.contentDisplay += '</p>';
        }

        this.destroyEscaper();
    }

    private getContentAsObject() {
        if (this.content === null) {
            return null;
        }

        if (typeof(this.content) === 'object') {
            return this.content;
        }

        if (typeof(this.content) === 'string') {
            try {
                return JSON.parse(this.content);
            } catch (err) {
                return null;
            }
        } else {
            return null;
        }
    }

    private addLine(line: any) {
        let text = this.escape(line.insert);

        if (this.isChapterContent) {
            text = text.replaceAll('\n', '</p>\n' + this.paragraphOpeningTag);
        } else {
            text = text.replaceAll('\n', '<br>\n' + this.paragraphOpeningTag);
        }

        if (line.hasOwnProperty('attributes')) {
            this.addTextWithAttributes(text, line.attributes);
        } else {
            this.contentDisplay += text;
        }
    }

    private initEscaper() {
        this.escaper = document.createElement('textarea');
    }

    private escape(text: string): string {
        this.escaper.innerHTML = text;
        return this.escaper.value;
    }

    private destroyEscaper() {
        this.escaper = null;
    }

    private addTextWithAttributes(text: string, attributes: any) {
        const isBold = attributes.hasOwnProperty('bold') && attributes.bold;
        const isItalic = attributes.hasOwnProperty('italic') && attributes.italic;
        const isUnderline = attributes.hasOwnProperty('underline') && attributes.underline;

        if (isBold) {
            this.contentDisplay += '<b>';
        }

        if (isItalic) {
            this.contentDisplay += '<i>';
        }

        if (isUnderline) {
            this.contentDisplay += '<u>';
        }

        this.contentDisplay += text;

        if (isBold) {
            this.contentDisplay += '</b>';
        }

        if (isItalic) {
            this.contentDisplay += '</i>';
        }

        if (isUnderline) {
            this.contentDisplay += '</u>';
        }
    }
}
