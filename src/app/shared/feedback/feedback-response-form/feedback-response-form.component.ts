import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { DialogService } from "../../dialog.service";
import { AppContext } from "../../app-context/app-context.service";
import { FeedbackQuickReplyService } from "../feedback-quick-reply.service";

@Component({
    selector: 'app-feedback-response-form',
    templateUrl: './feedback-response-form.component.html',
    styleUrls: ['./feedback-response-form.component.css'],
})
export class FeedbackResponseFormComponent implements OnInit, AfterViewInit {
    @Input() context: any = null;
    @ViewChild('richTextEditor') richTextEditor: any;
    @ViewChild('saveButton') saveButton!: ElementRef;

    constructor(public appContext: AppContext, private dialogs: DialogService, private quickReplyService: FeedbackQuickReplyService) {
    }

    ngOnInit(): void {
        document.getElementById('feedback-response-form-content')?.focus();
    }

    ngAfterViewInit(): void {
        this.richTextEditor.setContent(this.context.responseForm.content);
        this.richTextEditor.focus();
    }

    save() {
        if (this.context.responseForm.type === 'addResponse') {
            this.submitNewResponse();
        } else if (this.context.responseForm.type === 'editResponse') {
            this.submitEditResponse();
        } else {
            this.close()
        }
    }

    close() {
        this.context.responseForm.close();
        this.context.noEdit = false;
    }

    onEditorTabPressed() {
        this.saveButton?.nativeElement.focus();
    }

    editQuickReplies() {
        this.quickReplyService.showDialog();
    }

    sendQuickReply(reply: any) {
        this.sendNewResponse(reply.reply);
    }

    private submitNewResponse() {
        const response = this.richTextEditor.getContent();
        this.sendNewResponse(response);
    }

    private sendNewResponse(response: string) {
        if (this.context === null || this.context.feedbackService === null) {
            return;
        }

        this.context.responseForm.loading = true;
        this.context.responseForm.errors = {};

        this.context.feedbackService
            .saveResponse(this.context.responseForm.feedbackId, null, response)
            .fail(() => this.dialogs.showMessage('Error', 'Unable to save response'))
            .finally(() => this.context.responseForm.loading = false)
            .send((res: any) => this.onSubmitResponseResponse(res))
    }

    private submitEditResponse() {
        if (this.context === null || this.context.feedbackService === null) {
            return;
        }

        this.context.responseForm.loading = true;
        this.context.responseForm.errors = {};

        this.context.feedbackService
            .saveResponse(null, this.context.responseForm.responseId, this.richTextEditor.getContent())
            .fail(() => this.dialogs.showMessage('Error', 'Unable to save response'))
            .finally(() => this.context.responseForm.loading = false)
            .send((res: any) => this.onSubmitResponseResponse(res))
    }

    private onSubmitResponseResponse(res: any) {
        if (res.success) {
            this.close();
            this.context.responseForm.submitted.next(null);
        } else {
            this.context.responseForm.errors = res.errors;
        }
    }
}
