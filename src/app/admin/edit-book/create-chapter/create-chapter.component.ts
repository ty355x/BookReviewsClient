import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminChapterService } from '../admin-chapter.service';
import { AdminBookService } from '../../admin-book.service';
import { finalize } from 'rxjs';

@Component({
    templateUrl: './create-chapter.component.html',
})
export class CreateChapterComponent implements OnInit {
    @ViewChild('richTextEditor') richTextEditor: any;

    error: any = null;
    isLoading = true;

    bookId: any = null;
    book: any = null;
    chapter: any = {};
    content: any = {};
    formErrors: any = {};

    constructor(private route: ActivatedRoute, private router: Router, private bookService: AdminBookService, private chapterService: AdminChapterService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('bookId')) {
                this.showBook(params['bookId']);
            }
        });
    }

    save() {
        this.error = false;
        this.isLoading = true;
        this.formErrors = {};
        this.content.content = this.richTextEditor.getContent();

        this.chapterService
            .createChapterAndContent(this.chapter, this.content)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: res => this.onSaveChapterResponse(res),
                error: err => this.error = err,
            });
    }

    cancel() {
        this.navigateToBook();
    }

    toggleAutoTitle() {
        this.chapter.auto_title = !this.chapter.auto_title;
    }

    private showBook(bookId: number) {
        this.bookId = bookId;
        this.book = {};
        this.chapter = { book_id: this.bookId, title: null, auto_title: true };
        this.content = {};
        this.formErrors = {};

        this.isLoading = true;
        this.error = false;
        this.bookService
            .findBook(this.bookId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: res => this.onFindBookResponse(res),
                error: err => this.error = err,
        });
    }

    private onFindBookResponse(res: any) {
        this.book = res.book;
    }

    private onSaveChapterResponse(res: any) {
        if (res.success) {
            this.navigateToBook();
        } else {
            this.formErrors = res.errors;
        }
    }

    private navigateToBook() {
        this.router.navigate(['/admin/books/' + this.bookId]);
    }
}
