import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";
import { IFeedbackService } from "../shared/feedback/ifeedback.service";
import { ApiCall } from "../shared/api-call";

@Injectable({
    providedIn: 'root',
})
export class ReaderFeedbackService extends BaseService implements IFeedbackService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findBookFeedback(): ApiCall {
        throw new Error('Method not allowed');
    }

    findContentFeedback(contentId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/reader/feedback?contentId=' + contentId));
    }

    findLatestContentForChapter(chapterId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/reader/chapters/' + chapterId));
    }

    saveFeedback(contentId: number|null, feedbackId: number|null, feedback: string) {
        const postData = contentId !== null ?
             { contentId: contentId, feedback: feedback } :
             { feedbackId: feedbackId, feedback: feedback };

        return ApiCall.create(
            this.httpClient.post(this.apiPath + '/reader/feedback', postData)
        );
    }

    saveResponse(feedbackId: number|null, responseId: number|null, response: string): ApiCall {
        const postData = feedbackId !== null ?
            { feedbackId: feedbackId, response: response } :
            { responseId: responseId, response: response };

        return ApiCall.create(
            this.httpClient.post(this.apiPath + '/reader/feedback-response', postData)
        );
    }

    flagItemsReviewed(feedbackItems: any, responseItems: any): ApiCall {
        const postData = { feedbackItems: feedbackItems, responseItems: responseItems };
        return ApiCall.create(
            this.httpClient.post(this.apiPath + '/reader/feedback/mark-reviewed', postData)
        );
    }

    flagItemNotReviewed(itemId: number, itemType: string): ApiCall {
        const postData = { itemId: itemId, itemType: itemType };
        return ApiCall.create(
            this.httpClient.post(this.apiPath + '/reader/feedback/mark-not-reviewed', postData)
        );
    }
}
