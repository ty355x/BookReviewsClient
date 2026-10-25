import { NgModule } from "@angular/core";
import { BookHeaderComponent } from "./book-header/book-header.component";
import { LoadingComponent } from "./loading/loading.component";
import { PageErrorComponent } from "./page-error/page-error.component";
import { MessageDialogComponent } from "./message-dialog/message-dialog.component";
import { RichTextEditorComponent } from "./rich-text-editor/rich-text-editor.component";
import { RichTextComponent } from "./rich-text/rich-text.component";
import { FeedbackListComponent } from "./feedback/feedback-list/feedback-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { nl2brPipe } from "./pipes/pipes";
import { PromptDialogComponent } from "./prompt-dialog/prompt-dialog.component";
import { FeedbackMainComponent } from "./feedback/feedback-main/feedback-main.component";
import { FeedbackContentComponent } from "./feedback/feedback-content/feedback-content.component";
import { FeedbackFilterComponent } from "./feedback/feedback-filter/feedback-filter.component";
import { FeedbackEntryComponent } from "./feedback/feedback-entry/feedback-entry.component";
import { UserAccountComponent } from "./user-account/user-account.component";
import { ViewAccountComponent } from "./user-account/view-account/view-account.component";
import { EditAccountProfileComponent } from "./user-account/edit-account-profile/edit-account-profile.component";
import { ChangePasswordComponent } from "./user-account/change-password/change-password.component";
import { FeedbackFormComponent } from "./feedback/feedback-form/feedback-form.component";
import { FeedbackResponseFormComponent } from "./feedback/feedback-response-form/feedback-response-form.component";
import { FeedbackQuickReplyDialogComponent } from "./feedback/feedback-quick-reply-dialog/feedback-quick-reply-dialog.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
    ],
    declarations: [
        BookHeaderComponent,
        LoadingComponent,
        PageErrorComponent,
        MessageDialogComponent,
        RichTextComponent,
        RichTextEditorComponent,
        FeedbackMainComponent,
        FeedbackContentComponent,
        FeedbackEntryComponent,
        FeedbackListComponent,
        FeedbackFilterComponent,
        FeedbackFormComponent,
        FeedbackResponseFormComponent,
        FeedbackQuickReplyDialogComponent,
        PromptDialogComponent,
        nl2brPipe,
        UserAccountComponent,
        ViewAccountComponent,
        EditAccountProfileComponent,
        ChangePasswordComponent,
    ],
    exports: [
        BookHeaderComponent,
        LoadingComponent,
        PageErrorComponent,
        MessageDialogComponent,
        RichTextComponent,
        RichTextEditorComponent,
        FeedbackMainComponent,
        PromptDialogComponent,
        nl2brPipe,
    ],
})
export class SharedModule {}
