import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './view-feedback.component.html',
    styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {
    chapterId: any = null;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => this.onParamsChanged(params));
    }

    private onParamsChanged(params: any) {
        if (params.hasOwnProperty('chapterId')) {
            this.chapterId = params.chapterId;
        }
    }
}
