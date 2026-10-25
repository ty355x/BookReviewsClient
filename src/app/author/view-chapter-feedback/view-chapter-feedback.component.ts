import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './view-chapter-feedback.component.html',
    styleUrls: ['./view-chapter-feedback.component.css']
})
export class ViewChapterFeedbackComponent implements OnInit {
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
