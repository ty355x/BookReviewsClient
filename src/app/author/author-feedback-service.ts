import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/base.service";
import { IFeedbackService } from "../shared/feedback/ifeedback.service";
import { ApiCall } from "../shared/api-call";

@Injectable({
    providedIn: 'root',
})
export class AuthorFeedbackService extends BaseService implements IFeedbackService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findBookFeedback(bookId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/author/feedback?bookId=' + bookId));
    }

    findContentFeedback(contentId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/author/feedback?contentId=' + contentId));
    }

    findLatestContentForChapter(chapterId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/author/chapters/' + chapterId));
    }

    saveFeedback(contentId: number|null, feedbackId: number|null, feedback: string): ApiCall {
        throw new Error('Method not allowed');
    }

    saveResponse(feedbackId: number|null, responseId: number|null, response: string): ApiCall {
        const postData = feedbackId !== null ?
            { feedbackId: feedbackId, response: response } :
            { responseId: responseId, response: response };

        return ApiCall.create(
            this.httpClient.post(this.apiPath + '/author/feedback-response', postData)
        );
    }

    flagItemsReviewed(feedbackItems: any, responseItems: any): ApiCall {
        const postData = { feedbackItems: feedbackItems, responseItems: responseItems };

        return ApiCall.create(
            this.httpClient.post(this.apiPath + '/author/feedback/mark-reviewed', postData)
        );
    }

    flagItemNotReviewed(itemId: number, itemType: string): ApiCall {
        const postData = { itemId: itemId, itemType: itemType };

        return ApiCall.create(
            this.httpClient.post(this.apiPath + '/author/feedback/mark-not-reviewed', postData)
        );
    }
}
