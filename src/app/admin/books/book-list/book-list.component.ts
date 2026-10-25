import { Component, OnInit } from '@angular/core';
import { AdminBookService } from '../../admin-book.service';
import { MatDialog } from '@angular/material/dialog';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
    templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
    books: any = null;
    isLoading = true;
    error = null;

    constructor(private dialog: MatDialog, private router: Router, private bookService: AdminBookService) {
    }

    ngOnInit(): void {
        this.listBooks();
    }

    addBook() {
        const dialogRef = this.dialog.open(EditBookDialogComponent, {
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.bookSaved) {
                this.router.navigate(['admin/books/' + result.bookId]);
            }
        });
    }

    editBook(bookId: number) {
        this.router.navigate(['admin/books/' + bookId]);
    }

    private listBooks() {
        this.isLoading = true;
        this.bookService
            .findAllBooks()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (res:any) => { this.books = res.books },
                error: (res:any) => { this.error = res },
            });
    }
}
