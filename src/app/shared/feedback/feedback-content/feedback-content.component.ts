import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { UserNavService } from "../../user-nav.service";
import { FeedbackContext } from "../feedback-context/feedback-context";

@Component({
    selector: 'app-feedback-content',
    templateUrl: './feedback-content.component.html',
    styleUrls: ['./feedback-content.component.css'],
})
export class FeedbackContentComponent implements OnChanges {
    @Input() context: FeedbackContext|null = null;
    @Output() showFilter = new EventEmitter<null>();

    allowFilter = false;
    readerMode = false;

    chapterIndex = -1;
    disablePrevChapterButton = true;
    disableNextChapterButton = true;

    constructor(private userNav: UserNavService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('context')) {
            this.onContextChanged();
        }
    }

    backToBooks() {
        this.userNav.navigateToBooks();
    }

    backToChapters() {
        this.userNav.navigateToChapterList(this.context?.book.id);
    }

    showFilterPane() {
        this.showFilter.emit();
    }

    showAllBookFeedback() {
        this.context?.requestChapterId(null);
    }

    prevChapter() {
        if (this.context === null || !this.context.book.all_chapters || this.disablePrevChapterButton) {
            return;
        }

        const newChapter = this.context.book.all_chapters[this.chapterIndex - 1];
        this.context.requestChapterId(newChapter.id);
    }

    nextChapter() {
        if (this.context === null || !this.context.book.all_chapters || this.disableNextChapterButton) {
            return;
        }

        const newChapter = this.context.book.all_chapters[this.chapterIndex + 1];
        this.context.requestChapterId(newChapter.id);
    }

    changeChapter(chapterId: Number|null) {
        if (this.context !== null && chapterId !== this.context.chapterId) {
            this.context.requestChapterId(chapterId);
        }
    }

    private onContextChanged() {
        this.allowFilter = false;

        if (this.context !== null) {
            this.allowFilter = this.context.user !== null && this.context.user.role === 'author';
            this.context.bookChanged.subscribe(() => this.onBookChanged());
        }
    }

    private onBookChanged() {
        if (this.context === null) {
            return;
        }

        this.chapterIndex = -1;
        this.disablePrevChapterButton = true;
        this.disableNextChapterButton = true;

        if (this.context.book !== null && this.context.book.all_chapters) {
            this.chapterIndex = this.context.book.all_chapters.findIndex((chapter: any) => chapter.id === this?.context?.chapterId);

            this.disablePrevChapterButton = this.chapterIndex <= 0;
            this.disableNextChapterButton = this.context.book.all_chapters.length === 0 || this.chapterIndex >= this.context.book.all_chapters.length - 1;
        }
    }
}
