import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/base.service";
import { IFeedbackService } from "../shared/feedback/ifeedback.service";
import { ApiCall } from "../shared/api-call";

@Injectable({
    providedIn: 'root',
})
export class AdminFeedbackService extends BaseService implements IFeedbackService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findBookFeedback(bookId: number): ApiCall {
        throw new Error('Method not allowed');
    }

    findContentFeedback(contentId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/admin/feedback?contentId=' + contentId));
    }

    findLatestContentForChapter(chapterId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/admin/chapters/' + chapterId + '/feedback-page-content'));
    }

    saveFeedback(contentId: number|null, feedbackId: number|null, content: string): ApiCall {
        throw new Error('Method not allowed');
    }

    saveResponse(feedbackId: number|null, responseId: number|null, response: string): ApiCall {
        throw new Error('Method not allowed');
    }

    flagItemsReviewed(feedbackItems: any, responseItems: any): ApiCall {
        throw new Error('Method not allowed');
    }

    flagItemNotReviewed(itemId: number, itemType: string): ApiCall {
        throw new Error('Method not allowed');
    }
}
