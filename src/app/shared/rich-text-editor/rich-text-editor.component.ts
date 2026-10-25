import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
declare var Quill: any;

@Component({
    selector: 'app-rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    styleUrls: ['./rich-text-editor.component.css'],
})
export class RichTextEditorComponent implements OnInit, OnChanges {
    @Input('disabled') disabled = false;
    @Input('allowTab') allowTab = false;
    @Input('size') size = 'large';
    @Input('isChapterContent') isChapterContent = false;
    @Output('tabPressed') onTabPressed = new EventEmitter<null>();

    static richTextEditorCount = 0;

    richTextEditorId = '';
    richTextEditorToolbarId = '';

    private quill: any = null;

    ngOnInit(): void {
        this.richTextEditorId = 'rich-text-editor-' +  RichTextEditorComponent.richTextEditorCount;
        this.richTextEditorToolbarId = 'rich-text-editor-toolbar' + RichTextEditorComponent.richTextEditorCount;
        RichTextEditorComponent.richTextEditorCount++;
        setTimeout(() => this.initQuill());
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.handleInputChanges();
    }

    getContent() {
        return JSON.stringify(this.quill.getContents());
    }

    setContent(content: any) {
        setTimeout(() => this.setContentsInternal(content), 1)
    }

    focus() {
        setTimeout(() => this.quill.focus(), 1);
    }

    private handleInputChanges(): void {
        if (this.quill === null) {
            return;
        }

        if (this.disabled) {
            this.quill.disable();
        } else {
            this.quill.enable();
        }
    }

    private setContentsInternal(content: any) {
        if (!content) {
            this.quill.setContents('');
        } else if (typeof(content) === 'string') {
            this.quill.setContents(JSON.parse(content));
        } else {
            this.quill.setContents(content);
        }
    }

    private initQuill() {
        var quillOptions = {
            formats: [
                'bold', 'italic', 'underline',
            ],
            modules: {
                toolbar: '#' + this.richTextEditorToolbarId,
                keyboard: {},
            },
            theme: 'snow'
        }

        if (!this.allowTab) {
            quillOptions.modules.keyboard = {
                bindings: {
                    'tab': {
                        key: 9,
                        handler: () => this.onEditorTabPressed(),
                    }
                }
            };
        }

        this.quill = new Quill('#' + this.richTextEditorId, quillOptions);
        this.handleInputChanges();
    }

    private onEditorTabPressed() {
        this.onTabPressed.emit();
        return false;
    }
}
