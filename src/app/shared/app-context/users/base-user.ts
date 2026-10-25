import { IFeedbackService } from "../../feedback/ifeedback.service";
import { FeedbackServiceCatalogService as UserFeedbackServiceCatalog } from "../../feedback/feedback-service-catalog.service";

export abstract class BaseUser {
    id: number|null;
    name: string|null;
    email: string|null;
    role: string|null;
    fontSize: number = 0;
    quickReplies: any[] = [];

    constructor(user: any) {
        if (user !== null) {
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.role = user.role,
            this.fontSize = user.setting_font_size;
            this.quickReplies = user.quick_replies;
        } else {
            this.id = null;
            this.name = null;
            this.email = null;
            this.role = null;
            this.fontSize = 0;
            this.quickReplies = [];
        }
    }

    abstract getHomeRoute(): string;
    abstract getBasePath(): string;
    abstract getUserFeedbackService(feedbackCatalog: UserFeedbackServiceCatalog): IFeedbackService;
}
