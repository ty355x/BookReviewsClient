import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from "@angular/core";
import { DialogService } from "../../dialog.service";

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit, AfterViewInit {
    @Input() context: any = null;
    @ViewChild('richTextEditor') richTextEditor: any;
    @ViewChild('saveButton') saveButton!: ElementRef;

    constructor(private dialogs: DialogService) {
    }

    ngOnInit(): void {
        this.context.noEdit = true;
    }

    ngAfterViewInit(): void {
        this.richTextEditor.setContent(this.context.feedbackForm.content);
        this.richTextEditor.focus();
    }

    save() {
        if (this.context.feedbackForm.type === 'addFeedback' && this.context?.user.role === 'reader') {
            this.submitAddFeedback();
        } else if (this.context.feedbackForm.type === 'editFeedback' && this.context?.user.role === 'reader') {
            this.submitEditFeedback();
        } else {
            this.close();
        }
    }

    close() {
        this.context.feedbackForm.close();
        this.context.noEdit = false;
    }

    onEditorTabPressed() {
        this.saveButton?.nativeElement.focus();
    }

    private submitAddFeedback() {
        this.context.feedbackForm.loading = true;
        this.context.feedbackForm.errors = {};

        if (this.context === null || this.context.feedbackService === null) {
            return;
        }

        this.context.feedbackService
            .saveFeedback(this.context.contentId, null, this.richTextEditor.getContent())
            .fail(() => this.dialogs.showMessage('Error', 'Unable to save feedback'),)
            .finally(() => { this.context.feedbackForm.loading = false })
            .send((res: any) => this.onSubmitFeedbackFormResponse(res));
    }

    private submitEditFeedback() {
        this.context.feedbackForm.loading = true;
        this.context.feedbackForm.errors = {};

        if (this.context.feedbackForm.feedbackId === null || this.context === null || this.context.feedbackService === null) {
            return;
        }

        this.context.feedbackService
            .saveFeedback(null, this.context.feedbackForm.feedbackId, this.richTextEditor.getContent())
            .fail(() => this.dialogs.showMessage('Error', 'Unable to save feedback'))
            .finally(() => { this.context.feedbackForm.loading = false })
            .send((res: any) => this.onSubmitFeedbackFormResponse(res));
    }

    private onSubmitFeedbackFormResponse(res: any) {
        if (res.success) {
            this.close();
            this.context.feedbackForm.submitted.next(null);
        } else {
            this.context.feedbackForm.errors = res.errors;
        }
    }
}
