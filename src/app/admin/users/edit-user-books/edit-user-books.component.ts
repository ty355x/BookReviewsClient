import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AdminAssignedBookService } from 'src/app/admin/admin-assigned-book.service';
import { AdminUserService } from '../admin-user.service';

@Component({
    templateUrl: './edit-user-books.component.html',
    styleUrls: ['./edit-user-books.component.css'],
})
export class EditUserBooksComponent implements OnInit {
    isLoading = true;
    error: any = null;
    userId: any = null;
    user: any = null;
    assignedBooks: any = null;
    availableBooks: any = null;

    constructor(private route: ActivatedRoute, private router: Router, private userService: AdminUserService,
        private assignedBookService: AdminAssignedBookService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((param: any) => {
            if (param.hasOwnProperty('userId')) {
                this.userId = param.userId;
                this.showUser();
            }
        });
    }

    assignBook(book: any) {
        this.assignedBooks.push(book);
        this.availableBooks = this.availableBooks.filter(((b: any) => b.id !== book.id));
        this.sortBooks();
    }

    removeBook(book: any) {
        this.assignedBooks = this.assignedBooks.filter((b: any) => b.id !== book.id);
        this.availableBooks.push(book);
        this.sortBooks();
    }

    save() {
        if (this.user.role === 'author') {
            this.saveBooksForAuthor();
        } else if (this.user.role === 'reader') {
            this.saveBooksForReader();
        }
    }

    cancel() {
        this.navigateBackToUser();
    }

    private navigateBackToUser() {
        this.router.navigate(['/admin/users/' + this.user.id]);
    }

    private sortBooks() {
        this.assignedBooks.sort((a: any, b: any) => {
            return a.title.localeCompare(b.title);
        });

        this.availableBooks.sort((a: any, b: any) => {
            return a.title.localeCompare(b.title);
        });
    }

    private showUser() {
        this.error = null;
        this.isLoading = true;

        this.userService
            .findUser(this.userId)
            .subscribe({
                next: (res: any) => { this.onShowUserResponse(res); },
                error: (err: any) => { this.isLoading = false; this.error = err; }
        });
    }

    private onShowUserResponse(res: any) {
        this.user = res.user;

        if (this.user.role === 'author') {
            this.assignedBooks = this.user.author_books;
        } else if (this.user.role === 'reader') {
            this.assignedBooks = this.user.reader_books;
        } else {
            this.isLoading = false;
            this.error = 'Unable to assign books to this user';
            return;
        }

        this.showAvailableBooks();
    }

    private showAvailableBooks() {
        if (this.user.role === 'author') {
            this.showAvailableBooksForAuthor();
        } else if (this.user.role === 'reader') {
            this.showAvailableBooksForReader();
        }
    }

    private showAvailableBooksForAuthor() {
        this.assignedBookService
            .findAvailableBooksForAuthor(this.userId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (res: any) => this.onFindAvailableBooksResponse(res),
                error: (err: any) => this.error = err,
            });
    }

    private showAvailableBooksForReader() {
        this.assignedBookService
            .findAvailableBooksForReader(this.userId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (res: any) => this.onFindAvailableBooksResponse(res),
                error: (err: any) => this.error = err,
            });
    }

    private onFindAvailableBooksResponse(res: any) {
        this.availableBooks = res.books;
    }

    private saveBooksForAuthor() {
        this.isLoading = true;
        const bookIds = this.assignedBooks.map((book: any) => book.id);
        this.assignedBookService
            .saveAuthorBooks(this.userId, bookIds)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (res: any) => { this.navigateBackToUser(); },
                error: (err: any) => { this.error = err },
            });
    }

    private saveBooksForReader() {
        this.isLoading = true;
        const bookIds = this.assignedBooks.map((book: any) => book.id);
        this.assignedBookService
            .saveReaderBooks(this.userId, bookIds)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (res: any) => { this.navigateBackToUser(); },
                error: (err: any) => { this.error = err },
            });
    }
}
