import { NgModule } from "@angular/core";
import { EditUserDialogComponent } from './users/edit-user-dialog/edit-user-dialog.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { EditBookDialogComponent } from './books/edit-book-dialog/edit-book-dialog.component';
import { ViewBookComponent } from './edit-book/view-book/view-book.component';
import { ViewFeedbackComponent } from './view-feedback/view-feedback.component';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin.routing";
import { UserListComponent } from "./users/user-list/user-list.component";
import { SharedModule } from "../shared/shared.module";
import { EditUserBooksComponent } from "./users/edit-user-books/edit-user-books.component";
import { ViewUserProfileComponent } from "./users/view-user-profile/view-user-profile.component";
import { EditUserProfileComponent } from "./users/edit-user-profile/edit-user-profile.component";
import { CreateChapterComponent } from "./edit-book/create-chapter/create-chapter.component";
import { EditChapterTitleDialogComponent } from "./edit-book/edit-chapter-title-dialog/edit-chapter-title-dialog.component";
import { EditChapterContentComponent } from "./edit-book/edit-chapter-content/edit-chapter-content.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ImportKDPTrackUsersDialogComponent } from "./users/import-kdptrack-users-dialog/import-kdptrack-users-dialog.component";
import { ErrorLogComponent } from "./error-log/error-log.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AdminRoutingModule,
        SharedModule,
        DragDropModule,
    ],
    declarations: [
        CreateChapterComponent,
        EditChapterContentComponent,
        EditChapterTitleDialogComponent,
        BookListComponent,
        EditBookDialogComponent,
        ViewBookComponent,
        EditUserDialogComponent,
        ViewFeedbackComponent,
        UserListComponent,
        ViewUserProfileComponent,
        EditUserProfileComponent,
        EditUserBooksComponent,
        ImportKDPTrackUsersDialogComponent,
        ErrorLogComponent,
    ],
})
export class AdminModule {}
