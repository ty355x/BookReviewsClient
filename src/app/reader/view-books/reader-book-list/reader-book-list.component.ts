import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: './reader-book-list.component.html',
    selector: 'app-reader-book-list',
    styleUrls: ['../../../shared/styles/book-list.css'],
})
export class ReaderBookListComponent {
    @Input() books:any = [];

    constructor(private router: Router) {
    }

    viewBook(bookId: number) {
        this.router.navigate(['/reader/books/' + bookId]);
    }
}
