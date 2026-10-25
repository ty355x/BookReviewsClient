import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './view-book-feedback.component.html',
})
export class ViewBookFeedbackComponent implements OnInit {
    bookId: any = null;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            if (params.hasOwnProperty('bookId')) {
                this.bookId = params.bookId;
            }
        });
   }
}
