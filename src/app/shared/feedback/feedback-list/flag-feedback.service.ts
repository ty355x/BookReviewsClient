import { Injectable } from "@angular/core";
import { BaseService } from "../../base.service";
import { DialogService } from "../../dialog.service";
import { FeedbackList } from "../feedback-list";
import { IFeedbackService } from "../ifeedback.service";

@Injectable( {
    providedIn: 'root',
})
export class FlagFeedbackService extends BaseService {
    constructor(private dialogs: DialogService) {
        super();
    }

    markAllItemsReviewed(currentUserId: number|null, currentUserRole: string|null, feedbackList: FeedbackList, feedbackService: IFeedbackService|null) {
        if (feedbackList.filter.items.length === 0) {
            return;
        }

        var feedbackItems: any = [];
        const responseItems: any = [];

        for (const feedbackEntry of feedbackList.filter.items) {
            if (currentUserRole === 'author' && feedbackEntry.user.id !== currentUserId && feedbackEntry.reviewed === 0) {
                feedbackItems.push(feedbackEntry.id);
            }
            for (const response of feedbackEntry.responses) {
                if (response.user.id !== currentUserId && response.reviewed === 0) {
                    responseItems.push(response.id);
                }
            }
        }

        feedbackService
            ?.flagItemsReviewed(feedbackItems, responseItems)
            .fail(() => this.dialogs.showMessage('Error', 'Unable to save reviewed items'))
            .send((res: any) => this.onMarkItemsReviewedResponse(res, feedbackList));
    }

    markItemReviewed(item: any, feedbackList: FeedbackList, feedbackService: IFeedbackService|null) {
        const feedbackItems = [];
        const responseItems = [];

        if (item.hasOwnProperty('feedback_id')) {
            responseItems.push(item.id);
        } else {
            feedbackItems.push(item.id);
        }

        feedbackService
            ?.flagItemsReviewed(feedbackItems, responseItems)
            .fail(() => this.dialogs.showMessage('Error', 'Unable to save reviewed entry'))
            .send((res: any) => this.onMarkItemsReviewedResponse(res, feedbackList));
    }

    markItemNotReviewed(item: any, feedbackList: FeedbackList, feedbackService: IFeedbackService|null) {
        const itemType = item.hasOwnProperty('feedback_id') ? 'response' : 'feedback';

        feedbackService
            ?.flagItemNotReviewed(item.id, itemType)
            .fail(() => this.dialogs.showMessage('Error', 'Unable to save reviewed entry'))
            .send((res: any) => this.onMarkItemNotReviewedResponse(res, feedbackList));
    }

    private onMarkItemsReviewedResponse(res: any, feedbackList: FeedbackList) {
        for (const feedback of feedbackList.filter.items) {
            if (res.feedbackItems.includes(feedback.id)) {
                feedback.reviewed = 1;
            }

            for (const response of feedback.responses) {
                if (res.responseItems.includes(response.id)) {
                    response.reviewed = 1;
                }
            };
        }

        feedbackList.filter.filterItems();
        feedbackList.countNonReviewedItems();
    }

    private onMarkItemNotReviewedResponse(res: any, feedbackList: FeedbackList) {
        const itemId = res.itemId;
        const itemType = res.itemType;

        if (itemType === 'feedback') {
            for (const feedback of feedbackList.filter.items) {
                if (feedback.id === itemId) {
                    feedback.reviewed = 0;
                }
            }
        } else if (itemType === 'response') {
            for (const feedback of feedbackList.filter.items) {
                for (const response of feedback.responses) {
                    if (response.id === itemId) {
                        response.reviewed = 0;
                    }
                }
            }
        }

        feedbackList.filter.filterItems();
        feedbackList.countNonReviewedItems();
    }
}
