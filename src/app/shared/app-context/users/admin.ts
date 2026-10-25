import { IFeedbackService } from "../../feedback/ifeedback.service";
import { FeedbackServiceCatalogService as UserFeedbackServiceCatalog } from "../../feedback/feedback-service-catalog.service";
import { BaseUser } from "./base-user";

export class Admin extends BaseUser {
    constructor(user: any) {
        super(user);
    }

    override getHomeRoute(): string {
        return '/admin/books';
    }

    override getBasePath(): string {
        return '/admin';
    }

    override getUserFeedbackService(feedbackCatalog: UserFeedbackServiceCatalog): IFeedbackService {
        return feedbackCatalog.getAdminFeedbackService();
    }
}
