import { Subject } from "rxjs";

export class FeedbackForm {
    type: string|null = null;
    feedbackId: number|null = null;
    responseId: number|null = null;
    content: any = null;
    loading = false;
    errors: any = {};
    responseTarget: any = null;

    opened = new Subject();
    submitted = new Subject();

    addFeedback() {
        this.close();
        this.type = 'addFeedback';
        this.opened.next(null);
    }

    editFeedback(feedback: any) {
        this.close();
        this.type = 'editFeedback';
        this.feedbackId = feedback.id;
        this.content = feedback.feedback;
        this.opened.next(null);
    }

    close() {
        this.type = null;
        this.feedbackId = null;
        this.responseId = null;
        this.content = null;
        this.responseTarget = null;
        this.errors = {};
    }
}
