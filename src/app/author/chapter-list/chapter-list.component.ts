import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorChapterService } from '../author-chapter.service';

@Component({
    templateUrl: './chapter-list.component.html',
    styleUrls: ['./chapter-list.component.css'],
})
export class ChapterListComponent implements OnInit {
    isLoading = true;
    error: any = null;

    bookId: any = null;
    book: any = null;
    totalUnreviewedFeedback = 0;
    totalUnreviewedResponses = 0;

    constructor(private route: ActivatedRoute, private router: Router, private chapterService: AuthorChapterService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('bookId')) {
                this.bookId = params['bookId'];
                this.listChapters();
            }
        })
    }

    viewFeedback(chapterId: number) {
        this.router.navigate(['author/chapter-feedback/' + chapterId]);
    }

    backToBooks() {
        this.router.navigate(['/author/books']);
    }

    private listChapters() {
        this.chapterService
            .findChaptersForBook(this.bookId)
            .controller(this)
            .send((res: any) => this.onFindBooksResponse(res));
    }

    private onFindBooksResponse(res: any) {
        this.book = res.book;
        this.totalUnreviewedFeedback = res.total_unreviewed_feedback;
        this.totalUnreviewedResponses = res.total_unreviewed_responses;
    }
}
