import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ReaderBookService } from '../reader-book.service';
import { finalize } from 'rxjs';

@Component({
    templateUrl: './view-chapters.component.html',
    styleUrls: ['./view-chapters.component.css']
})
export class ViewChaptersComponent implements OnInit {
    isLoading = true;
    error = null;
    bookId: any = null;
    book: any = null;
    defaultBookCoverUrl = environment.assetsPath + '/book-covers/default.png';

    constructor(private route: ActivatedRoute, private router: Router, private bookService: ReaderBookService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if (params.hasOwnProperty('bookId')) {
                this.bookId = params['bookId'];
                this.showChapters();
            }
        })
    }

    backToBooks() {
        this.router.navigate(['/reader/my-books']);
    }

    reviewChapter(chapterId: number) {
        this.router.navigate(['/reader/review-chapter/' + chapterId]);
    }

    private showChapters() {
        this.bookService
            .findBookWithChapters(this.bookId)
            .controller(this)
            .send((res: any) => this.onFindBookWithChaptersResponse(res));
    }

    private onFindBookWithChaptersResponse(res: any) {
        this.book = res.book;
    }
}
