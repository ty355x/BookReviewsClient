import { Component, Input,  OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { AppContext } from "../../app-context/app-context.service";
import { FeedbackContext } from "../feedback-context/feedback-context";
import { FeedbackServiceCatalogService } from "../feedback-service-catalog.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-feedback-review',
    templateUrl: './feedback-main.component.html',
    styleUrls: ['./feedback-main.component.css'],
})
export class FeedbackMainComponent implements OnDestroy, OnChanges {
    @Input() reviewType: any = null;
    @Input() bookId: any = null;
    @Input() chapterId: any = null;

    context: FeedbackContext|null = null;

    private chapterIdChangeSubscription: any = null;
    private feedbackFormSubmittedSubscription: any = null;
    private responseFormSubmittedSubsription: any = null;

    constructor(private route: ActivatedRoute, private router: Router, private appContext: AppContext,
        private feedbackServiceCatalog: FeedbackServiceCatalogService) {
    }

    ngOnDestroy(): void {
        this.clearContext();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.clearContext();

        if (this.reviewType === null) {
            throw new Error('Invalid FeedbackMainComponent parameters - no review type specified');
        } else if (this.reviewType === 'book' && this.bookId === null) {
            throw new Error('Invalid FeedbackMainComponent parameters - no book specified');
        } else if (this.reviewType === 'chapter' && this.chapterId === null) {
            throw new Error('Invalid FeedbackMainComponent parameters - no chapter specified');
        }

        this.context = new FeedbackContext(this.appContext.user, this.reviewType, this.feedbackServiceCatalog);
        this.context.chapterId = this.chapterId !== null ? Number.parseInt(this.chapterId) : null;

        this.chapterIdChangeSubscription = this.context.chapterIdChangeRequested.subscribe((chapter: any) => this.onChapterRequested(chapter));
        this.feedbackFormSubmittedSubscription = this.context.feedbackForm.submitted.subscribe(() => this.showFeedback(false));
        this.responseFormSubmittedSubsription = this.context.responseForm.submitted.subscribe(() => this.showFeedback(false));

        if (this.reviewType === 'book') {
            this.showBookFeedback();
        } else if (this.reviewType === 'chapter') {
            this.showChapter();
        } else {
            throw new Error('Invalid reviewType specified');
        }
    }

    onChapterRequested(chapterId: any): void {
        if (!this.context) {
            return;
        }

        if (chapterId === this.context.chapterId) {
            return;
        }

        if (chapterId !== null && this.context.reviewType === 'chapter') {
            this.router.navigate(['../' + chapterId], { relativeTo: this.route });
            return;
        }

        this.context.setBook(null);
        this.context.chapterId = null;
        this.context.contentId = null;

        if (this.context.reviewType === 'book' && chapterId === null) {
            this.context.chapterId = null;
            this.context.showFilter = true;
            this.showBookFeedback();
        }

        if (this.context.reviewType === 'book' && chapterId !== null && this.context.chapterId !== chapterId) {
            this.context.chapterId = chapterId;
            this.context.showFilter = false;
            this.showChapter();
        }
    }

    showFilterPane(show: boolean) {
        if (this.context === null) {
            return;
        }

        this.context.showFilter = show;
        localStorage.setItem('feedback-filter-open', this.context?.showFilter ? '1' : '0');
    }

    private showFeedback(showLoading = true) {
        if (this.reviewType === 'book') {
            this.showBookFeedback(showLoading);
        } else if (this.reviewType === 'chapter') {
            this.showContentFeedback(showLoading);
        }
    }

    private showChapter() {
        if (this.context === null) {
            return;
        }

        this.setShowChapterLoading(true);
        this.setShowFeedbackLoading(true);

        this.context.feedbackService?.findLatestContentForChapter(this.context.chapterId)
            .fail(() => { this.setContentError('Unable to retrive chapter content'); this.setFeedbackEror('Unable to retrieve feedback'); })
            .finally(() => this.setShowChapterLoading(false))
            .send((res: any) => this.onFindChapterResponse(res));
    }

    private onFindChapterResponse(res: any) {
        if (this.context) {
            this.context.setBook(res.book);
            this.context.contentId = this.context.book.chapter.content.id;
            this.showContentFeedback();
        }
    }

    private showBookFeedback(showLoading = true) {
        if (this.context === null) {
            return;
        }

        if (showLoading) {
            this.setShowFeedbackLoading(true);
        }

        this.context.feedbackService?.findBookFeedback(this.bookId)
            .fail(() => this.setFeedbackEror('Unable to retrive feedback'))
            .finally(() => this.setShowFeedbackLoading(false))
            .send((res: any) => this.onFindFeedbackResponse(res));
    }

    private showContentFeedback(showLoading = true) {
        if (this.context === null) {
            return;
        }

        if (showLoading) {
            this.setShowFeedbackLoading(true);
        }

        this.context.feedbackService?.findContentFeedback(this.context.contentId)
            .fail(() => this.setFeedbackEror('Unable to retrive feedback'))
            .finally(() => this.setShowFeedbackLoading(false))
            .send((res: any) => this.onFindFeedbackResponse(res));
    }

    private onFindFeedbackResponse(res: any) {
        if (this.context === null) {
            return;
        }

        this.context.feedbackList.setItemsFromBookList(res.books);
    }

    private setShowChapterLoading(show: boolean) {
        if (this.context !== null) {
            this.context.showChapterLoading = show;
        }
    }

    private setShowFeedbackLoading(show: boolean) {
        if (this.context !== null) {
            this.context.showFeedbackLoading = show;
        }
    }

    private setContentError(error: string) {
        if (this.context !== null) {
            this.context.showChapterLoading = false;
            this.context.showFeedbackLoading = false;
            this.context.contentError = error;
        }
    }

    private setFeedbackEror(error: string) {
        if (this.context !== null) {
            this.context.showFeedbackLoading = false;
            this.context.feedbackError = error;
        }
    }

    private clearContext() {
        this.chapterIdChangeSubscription?.unsubscribe();
        this.feedbackFormSubmittedSubscription?.unsubscribe();
        this.responseFormSubmittedSubsription?.unsubscribe();
        this.context = null;
    }
}
