import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdminBookService } from "../../admin-book.service";

@Component({
    templateUrl: './edit-book-dialog.component.html',
})
export class EditBookDialogComponent {
    book: any = {};
    errors: any = {};
    isCreating = true;
    isLoading = false;

    constructor(private dialogRef: MatDialogRef<EditBookDialogComponent>, private bookService: AdminBookService,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        if (this.data) {
            this.book = data.book;
            this.isCreating = false;
        }
    }

    save() {
        this.errors = {};
        this.bookService
            .saveBook(this.book)
            .subscribe((res: any) => { this.onSaveBookResult(res); });
    }

    cancel() {
        this.dialogRef.close({ bookSaved: false });
    }

    private onSaveBookResult(res: any) {
        if (res.success === true) {
            this.dialogRef.close({ bookSaved: true , bookId: res.bookId });
        } else {
            this.errors = res.errors;
        }
    }
}
