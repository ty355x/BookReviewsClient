import { IFeedbackService } from "../../feedback/ifeedback.service";
import { FeedbackServiceCatalogService as UserFeedbackServiceCatalog } from "../../feedback/feedback-service-catalog.service";
import { BaseUser } from "./base-user";

export class Reader extends BaseUser {
    constructor(user: any) {
        super(user);
    }

    override getHomeRoute(): string {
        return '/reader/my-books';
    }

    override getBasePath(): string {
        return '/reader';
    }

    override getUserFeedbackService(feedbackCatalog: UserFeedbackServiceCatalog): IFeedbackService {
        return feedbackCatalog.getReaderFeedbackService();
    }
}
