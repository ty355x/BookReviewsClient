import { FeedbackList } from "../feedback-list";
import { IFeedbackService } from "../ifeedback.service";
import { Subject } from "rxjs";
import { FeedbackServiceCatalogService } from "../feedback-service-catalog.service";
import { BaseUser } from "../../app-context/users/base-user";
import { Guest } from "../../app-context/users/guest";
import { FeedbackForm } from "./feedback-form";
import { FeedbackResponseForm } from "./feedback-response-form";

export class FeedbackContext {
    bookChanged = new Subject();
    chapterIdChangeRequested = new Subject();

    user: BaseUser = new Guest();

    book: any = null;
    bookChapterIds: any = null;
    chapterId: any = null;
    contentId: any = null;

    reviewType: string|null = null;

    showFilter = false;
    showChapterLoading = false;
    showFeedbackLoading = false;
    noEdit = false;

    feedbackList: FeedbackList;
    feedbackService: IFeedbackService|null = null;

    contentError: string|null = null;
    feedbackError: string|null = null;

    feedbackForm = new FeedbackForm();
    responseForm = new FeedbackResponseForm();

    constructor(user: BaseUser, reviewType: string, feedbackServiceCatalog: FeedbackServiceCatalogService) {
        this.user = user;
        this.reviewType = reviewType;
        this.feedbackList = new FeedbackList(this.user);
        this.feedbackService = this.user.getUserFeedbackService(feedbackServiceCatalog);
        this.determineFeedbackFilterOpen();

        this.feedbackForm.opened.subscribe(() => this.responseForm.close());
        this.responseForm.opened.subscribe(() => this.feedbackForm.close());
    }

    setBook(book: any = null) {
        this.book = book;
        this.bookChanged.next(null);
    }

    requestChapterId(chapterId: Number|null) {
        if (chapterId !== this.chapterId) {
            this.chapterIdChangeRequested.next(chapterId);
        }
    }

    private determineFeedbackFilterOpen() {
        if (this.reviewType !== 'chapter') {
            this.showFilter = true;
        } else if (this.user.role === 'author') {
            this.showFilter = localStorage.getItem('feedback-filter-open') === '1';
        } else {
            this.showFilter = false;
        }
    }
}
