import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: './reader-unreviewed-chapters.component.html',
    selector: 'app-reader-unreviewed-chapters',
    styleUrls: ['../../../shared/styles/book-list.css'],
})
export class ReaderUnreviewedChapters {
    @Input() books: any|null = [];

    constructor(private router: Router) {
    }

    reviewChapter(chapter: any) {
        this.router.navigate(['/reader/review-chapter/' + chapter.id]);
    }
}
