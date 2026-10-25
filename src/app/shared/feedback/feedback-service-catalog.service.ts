import { AdminFeedbackService } from "src/app/admin/admin-feedback.service";
import { AuthorFeedbackService } from "src/app/author/author-feedback-service";
import { ReaderFeedbackService } from "src/app/reader/reader-feedback.service";
import { IFeedbackService } from "./ifeedback.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FeedbackServiceCatalogService {
    constructor(private adminFeedbackService: AdminFeedbackService, private readerFeedbackService: ReaderFeedbackService,
        private authorFeedbackService: AuthorFeedbackService) {
    }

    getAdminFeedbackService(): IFeedbackService {
        return this.adminFeedbackService;
    }

    getReaderFeedbackService(): IFeedbackService {
        return this.readerFeedbackService;
    }

    getAuthorFeedbackService(): IFeedbackService {
        return this.authorFeedbackService;
    }
}
