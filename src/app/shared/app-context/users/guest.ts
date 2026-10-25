import { FeedbackServiceCatalogService } from "../../feedback/feedback-service-catalog.service";
import { IFeedbackService } from "../../feedback/ifeedback.service";
import { BaseUser } from "./base-user";

export class Guest extends BaseUser {
    constructor() {
        super(null);
    }

    override getHomeRoute(): string {
        return '/login';
    }

    override getBasePath(): string {
        throw new Error('Method not supported');
    }

    override getUserFeedbackService(feedbackCatalog: FeedbackServiceCatalogService): IFeedbackService {
        throw new Error('Method not supported');
    }
}
