import { Component, Input } from "@angular/core";
import { FlagFeedbackService } from "./flag-feedback.service";
import { FeedbackContext } from "../feedback-context/feedback-context";

@Component({
    selector: 'app-feedback-list',
    templateUrl: './feedback-list.component.html',
    styleUrls: ['./feedback-list.component.css'],
})
export class FeedbackListComponent {
    @Input() context: FeedbackContext|null = null;

    constructor(private flagFeedbackService: FlagFeedbackService) {
    }

    showFeedbackForm() {
        if (this.context === null || this.context.user.role !== 'reader') {
            return;
        }

        this.context.feedbackForm.addFeedback();
    }

    showResponseForm(feedback: any) {
        if (this.context === null || this.context.user.role === 'admin') {
            return;
        }

        this.context.responseForm.addResponse(feedback);
    }

    showEditFeedbackForm(feedback: any) {
        if (this.context === null || this.context.user.role !== 'reader') {
            return;
        }

        this.context.feedbackForm.editFeedback(feedback);
    }

    showEditResponseForm(response: any) {
        if (this.context === null || this.context.user.role === 'admin') {
            return;
        }

        this.context.responseForm.editResponse(response);
    }

    markAllItemsAsReviewed() {
        if (this.context !==  null && this.context?.feedbackList.nonReviewedItemCount > 0) {
            this.flagFeedbackService.markAllItemsReviewed(this.context?.user.id, this.context?.user.role, this.context.feedbackList, this.context.feedbackService);
        }
    }

    flagReviewed(entry: any) {
        if (this.context !== null) {
            this.flagFeedbackService.markItemReviewed(entry, this.context.feedbackList, this.context.feedbackService);
        }
    }

    flagNotReviewed(entry: any) {
        if (this.context !== null) {
            this.flagFeedbackService.markItemNotReviewed(entry, this.context.feedbackList, this.context.feedbackService);
        }
    }
}
