import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './review-chapter.component.html',
    styleUrls: ['./review-chapter.component.css'],
})
export class ReviewChapterComponent implements OnInit {
    chapterId: any = null;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            if (params.hasOwnProperty('chapterId')) {
                this.chapterId = params.chapterId;
            }
        });
    }
}
