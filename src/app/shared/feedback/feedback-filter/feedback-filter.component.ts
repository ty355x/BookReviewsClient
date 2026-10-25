import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserNavService } from "../../user-nav.service";
import { FeedbackContext } from "../feedback-context/feedback-context";

@Component({
    selector: 'app-feedback-filter',
    templateUrl: './feedback-filter.component.html',
    styleUrls: ['./feedback-filter.component.css'],
})
export class FeedbackFilterComponent {
    @Input() context: FeedbackContext|null = null;
    @Output() close = new EventEmitter();

    constructor(private userNav: UserNavService) {
    }

    backToBooks() {
        this.userNav.navigateToBooks();
    }

    backToChapters() {
        this.userNav.navigateToChapterList(this.context?.book?.id);
    }

    hideFilterPane() {
        this.close.emit();
    }

    toggleShowReviewed() {
        this.context?.feedbackList.filter.toggleShowReviewed();
    }

    toggleShowResponses() {
        this.context?.feedbackList.filter.toggleShowResponses();
    }

    toggleShowBook(bookId: number) {
        this.context?.feedbackList.filter.toggleShowBook(bookId);
    }

    toggleShowChapter(bookId: number, chapterId: number) {
        this.context?.feedbackList.filter.toggleShowChapter(bookId, chapterId);
    }

    toggleShowUser(userId: number) {
        this.context?.feedbackList.filter.toggleShowUser(userId);
    }

    showAllBookFeedback() {
        this.context?.chapterIdChangeRequested.next(null);
    }
}
