import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FeedbackContext } from "../feedback-context/feedback-context";
import { FeedbackResponseForm } from "../feedback-context/feedback-response-form";

@Component({
    selector: 'app-feedback-entry',
    templateUrl: './feedback-entry.component.html',
    styleUrls: ['./feedback-entry.component.css'],
})
export class FeedbackEntryComponent {
    @Input() context: FeedbackContext|null = null;
    @Input() feedback: any = null;

    @Output() editFeedback = new EventEmitter<any>();
    @Output() addResponse = new EventEmitter<any>();
    @Output() editResponse = new EventEmitter<any>();
    @Output() flagReviewed = new EventEmitter<any>();
    @Output() flagNotReviewed = new EventEmitter<any>();

    viewChapter(chapter: any) {
        this.context?.chapterIdChangeRequested.next(chapter.id);
    }

    addResponseForEntry(feedback: any) {
        this.context?.responseForm.addResponse(feedback);
    }

    editReaderResponse(response: any) {
        this.context?.responseForm.editResponse(response);
    }

    editReaderFeedback(feedback: any) {
        this.editFeedback.emit(feedback);
    }

    flagEntryReviewed(entry: any) {
        this.flagReviewed.emit(entry);
    }

    flagEntryNotReviewed(entry: any) {
        this.flagNotReviewed.emit(entry);
    }

    isFeedbackReviewed() {
        return this.context?.user.role === 'author' && !this.feedback.reviewed;
    }

    isResponseReviewed(response: any) {
        return !(this.context?.user.id !== response.user.id && !response.reviewed);
    }

    canMarkReviewed() {
        return !this.context?.noEdit && this.context?.user.role !== 'admin';
    }

    shouldShowResponseButton() {
        if (this.context?.user.role === 'reader') {
            return this.feedback.responses.length > 0;
        } else if (this.context?.user.role === 'author') {
            return true;
        } else {
            return false;
        }
    }
}
