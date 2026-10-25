import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../base.service";
import { FeedbackQuickReplyDialogComponent } from "./feedback-quick-reply-dialog/feedback-quick-reply-dialog.component";
import { ApiCall } from "../api-call";

@Injectable({
    providedIn: 'root',
})
export class FeedbackQuickReplyService extends BaseService {
    constructor(private httpClient: HttpClient, private dialog: MatDialog) {
        super();
    }

    showDialog() {
        return this.dialog
            .open(FeedbackQuickReplyDialogComponent)
            .afterClosed();
    }

    save(id: number, reply: string): ApiCall {
        const postData = { id: id, reply: reply };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/author/quick-replies', postData));
    }

    delete(id: number): ApiCall {
        return ApiCall.create(this.httpClient.delete(this.apiPath + '/author/quick-replies/' + id));
    }
}
