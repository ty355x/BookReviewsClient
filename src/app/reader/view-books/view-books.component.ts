import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReaderBookService } from "../reader-book.service";

@Component({
    templateUrl: './view-books.component.html',
    styleUrls: ['../../shared/styles/book-list.css'],
})
export class ViewBooksComponent implements OnInit {
    isLoading = true;
    error: any = null;
    view: string|null = null;

    books:any = [];
    totalUnreviewedChapters = 0;
    totalUnreviewedResponses = 0;
    lastChapter: any|null = null;
    unreviewedChapters: any|null = null;

    constructor(private route: ActivatedRoute, private router: Router, private bookService: ReaderBookService) {
        this.route.queryParams.subscribe((params: any) => this.onPageQueryParamsChanged(params));
    }

    ngOnInit(): void {
        this.showBooks();
    }

    resumeLastChapter(chapterId: number) {
        this.router.navigate(['/reader/review-chapter/' + chapterId]);
    }

    setView(view: string|null) {
        this.router.navigate([], { queryParams: { view: view }});
    }

    private onPageQueryParamsChanged(params: any) {
        if (!params.hasOwnProperty('view')) {
            this.view = null;
            return;
        }

        if (params.view === 'unreviewed-chapters') {
            this.view = 'unreviewed-chapters';
        } else {
            this.view = null;
        }
    }

    private showBooks() {
        this.bookService
            .findBooksForCurrentReader()
            .controller(this)
            .send((res: any) => this.onFindBooksResponse(res));
    }

    private onFindBooksResponse(res: any) {
        this.books = res.books;
        this.totalUnreviewedChapters = res.total_unreviewed_chapters;
        this.totalUnreviewedResponses = res.total_unreviewed_responses;
        this.lastChapter = res.last_chapter;
        this.unreviewedChapters = res.unreviewed_chapters;
    }
}
