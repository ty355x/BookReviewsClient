import { Component, OnInit } from '@angular/core';
import { AdminChapterService } from '../admin-chapter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditChapterTitleDialogComponent } from '../edit-chapter-title-dialog/edit-chapter-title-dialog.component';
import { EditBookDialogComponent } from '../../books/edit-book-dialog/edit-book-dialog.component';
import { environment } from 'src/environments/environment';
import { AdminBookService } from '../../admin-book.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
    templateUrl: './view-book.component.html',
    styleUrls: ['./view-book.component.css'],
})
export class ViewBookComponent implements OnInit {
    isLoading = true;
    error: any = null;
    bookId: any = null;
    book: any = null;
    chapters: any = null;
    appPath = environment.appPath;

    constructor(private route: ActivatedRoute, private router: Router, private matDialog: MatDialog, private adminBookService: AdminBookService,
        private chapterService: AdminChapterService, private dialogs: DialogService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('bookId')) {
                this.bookId = params['bookId'];
                this.showBook();
            }
        })
    }

    addChapter() {
        this.router.navigate(['admin/books/' + this.bookId + '/add-chapter']);
    }

    editChapterTitle(chapter: any) {
        this.matDialog
            .open(EditChapterTitleDialogComponent, { data: Object.assign({}, chapter), })
            .afterClosed().subscribe(result => {
                if (result !== false) {
                    this.showBook();
                }
            });
    }

    editChapterContent(chapterId: number) {
        this.router.navigate(['admin/chapters/' + chapterId + '/latest-content']);
    }

    viewFeedback(chapterId: number) {
        this.router.navigate(['admin/chapters/' + chapterId + '/feedback']);
    }

    dropChapter(e: any) {
        if (e.previousIndex === e.currentIndex) {
            return;
        }

        this.chapterService
            .reorderChapter(this.bookId, e.previousIndex, e.currentIndex)
            .subscribe({
                next: (res: any) => this.showBook(true),
                error: (err: any) => console.error(err),
            });
    }

    backToBooks() {
        this.router.navigate(['/admin/books']);
    }

    editBookProperties() {
        const dialogRef = this.matDialog.open(EditBookDialogComponent, {
            data: {book: Object.assign({}, this.book) },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.bookSaved) {
                this.showBook();
            }
        });
    }

    makeSignupUrl(bookId: number) {
        this.adminBookService
            .makeSignupCode(bookId)
            .subscribe({
                next: (res: any) => this.onMakeSignupCodeResponse(res),
                error: (err: any) => this.dialogs.showMessage('Error', 'Unable to make signup url'),
            });
    }

    deleteSignupUrl(bookId: number) {
        this.dialogs
            .showPrompt('Confirm Delete Signup URL', 'Are you sure you want to delete the signup url? ' +
                'This will prevent users who have been sent the signup url from signing up for the book')
            .subscribe((res: any) => {
                if (res === true) {
                    this.onConfirmDeleteSignupUrl(bookId);
                }
            });
    }

    private onConfirmDeleteSignupUrl(bookId: number) {
        this.adminBookService
        .deleteSignupCode(bookId)
        .subscribe({
            next: (res: any) => this.onDeleteSignupCodeResponse(res),
            error: (err: any) => this.dialogs.showMessage('Error', 'Unable to delete signup url'),
        });
    }

    private onMakeSignupCodeResponse(res: any) {
        this.book.signup_code = res.signup_code;
    }

    private onDeleteSignupCodeResponse(res: any) {
        this.book.signup_code = null;
    }

    private showBook(hideLoading: boolean = false) {
        this.error = null;

        if (!hideLoading) {
            this.isLoading = true;
        }

        this.chapterService
            .findChaptersForBookWithFeedbackCount(this.bookId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (res: any) => this.onFindChaptersResponse(res),
                error: (err: any) => this.error = err,
            });
    }

    private onFindChaptersResponse(res: any) {
        this.book = res.book;
        this.chapters = res.chapters;
    }
}
