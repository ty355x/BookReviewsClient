import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./admin.guard";
import { BookListComponent } from "./books/book-list/book-list.component";
import { EditChapterContentComponent } from "./edit-book/edit-chapter-content/edit-chapter-content.component";
import { ViewBookComponent } from "./edit-book/view-book/view-book.component";
import { ViewFeedbackComponent } from "./view-feedback/view-feedback.component";
import { UserListComponent } from "./users/user-list/user-list.component";
import { SiteLayoutComponent } from "../public/site-layout/site-layout.component";
import { EditUserBooksComponent } from "./users/edit-user-books/edit-user-books.component";
import { ViewUserProfileComponent } from "./users/view-user-profile/view-user-profile.component";
import { EditUserProfileComponent } from "./users/edit-user-profile/edit-user-profile.component";
import { CreateChapterComponent } from "./edit-book/create-chapter/create-chapter.component";
import { ErrorLogComponent as ErrorLogComponent } from "./error-log/error-log.component";

export const routes: Routes = [{
    path: 'admin',
    component: SiteLayoutComponent,
    canActivateChild: [AdminGuard],
    children: [
        { path: 'books', component: BookListComponent },
        { path: 'books/:bookId', component: ViewBookComponent },
        { path: 'books/:bookId/add-chapter', component: CreateChapterComponent, },
        { path: 'chapters/:chapterId/latest-content', component: EditChapterContentComponent },
        { path: 'chapters/:chapterId/feedback', component: ViewFeedbackComponent },
        { path: 'chapter-content/:contentId', component: EditChapterContentComponent },
        { path: 'users', component: UserListComponent },
        { path: 'users/:userId', component: ViewUserProfileComponent },
        { path: 'users/:userId/edit-profile', component: EditUserProfileComponent },
        { path: 'users/:userId/edit-assigned-books', component: EditUserBooksComponent },
        { path: 'error-log', component: ErrorLogComponent },
    ],
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }
