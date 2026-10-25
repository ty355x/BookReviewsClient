import { Component, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DialogService } from "../../dialog.service";
import { AppContext } from "../../app-context/app-context.service";
import { FeedbackQuickReplyService } from "../feedback-quick-reply.service";

@Component({
    templateUrl: './feedback-quick-reply-dialog.component.html',
    styleUrls: ['./feedback-quick-reply-dialog.component.css'],
})
export class FeedbackQuickReplyDialogComponent {
    @ViewChild('replyEditor') replyEditor: any;
    replies: any[] = [];

    constructor(private dialogRef: MatDialogRef<FeedbackQuickReplyDialogComponent>, private dialogs: DialogService, private appContext: AppContext,
        private quickReplyService: FeedbackQuickReplyService) {
        this.loadReplies();
    }

    addReply() {
        if (this.replies.length >= 3) {
            return;
        }

        this.finishEditReply();
        this.replies.push({ id: null, reply: '', edit: true });

        setTimeout(() => {
            this.replyEditor.setContent('');
            this.replyEditor.focus();
        });
    }

    editReply(replyId: number) {
        this.finishEditReply();
        const reply: any = this.replies.find(r => r.id === replyId);
        reply.edit = true;

        setTimeout(() => {
            this.replyEditor.setContent(reply.reply);
            this.replyEditor.focus();
        });
    }

    finishEditReply() {
        this.replies.forEach(reply => reply.edit = false);
        this.replies = this.replies.filter(reply => reply.id !== null);
    }

    deleteReply(reply: any) {
        this.dialogs.showPrompt('Delete Quick Reply', 'Are you sure you want to delete this reply?')
            .subscribe((res: any) => {
                if (res) {
                    this.onDeleteReplyConfirmed(reply);
                }
            });
    }

    saveReply(reply: any) {
        this.quickReplyService.save(reply.id, this.replyEditor.getContent())
            .send((res: any) => this.onSaveReplyResponse(res));
    }

    close() {
        this.dialogRef.close(false);
    }

    private onDeleteReplyConfirmed(reply: any) {
        this.quickReplyService.delete(reply.id)
            .send((res: any) => this.onDeleteReplyResponse(res));
    }

    private onSaveReplyResponse(res: any) {
        if (!res.success) {
            this.dialogs.showMessage('Unable to save quick reply', res.error);
        } else {
            this.appContext.user.quickReplies = res.user_quick_replies;
            this.finishEditReply();
            this.loadReplies();
        }
    }

    private onDeleteReplyResponse(res: any) {
        if (!res.success) {
            this.dialogs.showMessage('Unable to delete quick reply', res.error);
        } else {
            this.appContext.user.quickReplies = res.user_quick_replies;
            this.loadReplies();
        }
    }

    private loadReplies() {
        this.replies = this.appContext.user.quickReplies.map(reply => {
            return { id: reply.id, reply: reply.reply, edit: false };
        });
    }
}
