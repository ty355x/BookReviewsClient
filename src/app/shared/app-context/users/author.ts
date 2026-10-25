import { IFeedbackService } from "../../feedback/ifeedback.service";
import { FeedbackServiceCatalogService as UserFeedbackServiceCatalog } from "../../feedback/feedback-service-catalog.service";
import { BaseUser } from "./base-user";

export class Author extends BaseUser {
    constructor(user: any) {
        super(user);
    }

    override getHomeRoute(): string {
        return '/author/books';
    }

    override getBasePath(): string {
        return '/author';
    }

    override getUserFeedbackService(feedbackCatalog: UserFeedbackServiceCatalog): IFeedbackService {
        return feedbackCatalog.getAuthorFeedbackService();
    }
}
