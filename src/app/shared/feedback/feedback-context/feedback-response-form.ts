import { Subject } from "rxjs";

export class FeedbackResponseForm {
    type: string|null = null;
    feedbackId: number|null = null;
    responseId: number|null = null;
    content: any = null;
    loading = false;
    errors: any = {};

    opened = new Subject();
    submitted = new Subject();

    addResponse(feedback: any) {
        this.close();
        this.type = 'addResponse';
        this.feedbackId = feedback.id;
        this.opened.next(null);
    }

    editResponse(response: any) {
        this.close();
        this.type = 'editResponse';
        this.responseId = response.id;
        this.content = response.response;
        this.opened.next(null);
    }

    close() {
        this.type = null;
        this.feedbackId = null;
        this.responseId = null;
        this.content = null;
        this.loading = false;
        this.errors = {};
    }
}
