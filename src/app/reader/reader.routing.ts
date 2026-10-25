import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReaderGuard } from "./reader.guard";
import { ViewChaptersComponent } from "./view-chapters/view-chapters.component";
import { ReviewChapterComponent } from "./review-chapter/review-chapter.component";
import { SiteLayoutComponent } from "../public/site-layout/site-layout.component";
import { ViewBooksComponent } from "./view-books/view-books.component";
import { UserAccountComponent } from "../shared/user-account/user-account.component";

export const routes: Routes = [{
    path: 'reader',
    component: SiteLayoutComponent,
    canActivateChild: [ReaderGuard],
    children: [
        { path: 'my-books', component: ViewBooksComponent },
        { path: 'books/:bookId', component: ViewChaptersComponent },
        { path: 'review-chapter/:chapterId', component: ReviewChapterComponent },
        { path: 'account', component: UserAccountComponent },
    ],
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class ReaderRoutingModule { }
