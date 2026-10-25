import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SiteLayoutComponent } from "../public/site-layout/site-layout.component";
import { AuthorGuard } from "./author.guard";
import { BookListComponent } from "./book-list/book-list.component";
import { ChapterListComponent } from "./chapter-list/chapter-list.component";
import { ViewBookFeedbackComponent } from "./view-book-feedback/view-book-feedback.component";
import { ViewChapterFeedbackComponent } from "./view-chapter-feedback/view-chapter-feedback.component";
import { UserAccountComponent } from "../shared/user-account/user-account.component";

export const routes: Routes = [{
    path: 'author',
    component: SiteLayoutComponent,
    canActivateChild: [AuthorGuard],
    children: [
        { path: 'books', component: BookListComponent },
        { path: 'books/:bookId/chapters', component: ChapterListComponent },
        { path: 'books/:bookId/feedback', component: ViewBookFeedbackComponent },
        { path: 'chapter-feedback/:chapterId', component: ViewChapterFeedbackComponent },
        { path: 'account', component: UserAccountComponent },
    ],
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AuthorRoutingModule { }
