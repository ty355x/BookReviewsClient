import { ApiCall } from "../api-call";

export interface IFeedbackService {
    findBookFeedback(bookId: number): ApiCall;
    findContentFeedback(contentId: number): ApiCall;
    findLatestContentForChapter(chapterId: number): ApiCall;
    saveFeedback(contentId: number|null, feedbackId: number|null, content: string): ApiCall;
    saveResponse(feedbackId: number|null, responseId: number|null, response: string): ApiCall;
    flagItemsReviewed(feedbackItems: any, responseItems: any): ApiCall;
    flagItemNotReviewed(itemId: number, itemType: string): ApiCall;
}
