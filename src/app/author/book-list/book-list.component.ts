import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthorBookService } from "../author-book.service";

@Component({
    templateUrl: './book-list.component.html',
    styleUrls: ['../../shared/styles/book-list.css'],
})
export class BookListComponent implements OnInit {
    isLoading = true;
    error: any = null;

    books: any = null;
    totalUnreviewedFeedback = 0;
    totalUnreviewedResponses = 0;

    constructor(private router: Router, private bookService: AuthorBookService) {
    }

    ngOnInit(): void {
        this.bookService
            .findBooksForCurrentAuthor()
            .controller(this)
            .send((res: any) => this.onFindBooksResponse(res));
    }

    viewFeedback(bookId: number) {
        this.router.navigate(['/author/books/' + bookId + '/feedback']);
    }

    viewChapters(bookId: number) {
        this.router.navigate(['/author/books/' + bookId + '/chapters']);
    }

    private onFindBooksResponse(res: any) {
        this.books = res.books;
        this.totalUnreviewedFeedback = res.total_unreviewed_feedback;
        this.totalUnreviewedResponses = res.total_unreviewed_responses;
    }
}
