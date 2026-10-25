import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AuthorRoutingModule } from "./author.routing";
import { BookListComponent } from "./book-list/book-list.component";
import { ChapterListComponent } from "./chapter-list/chapter-list.component";
import { SharedModule } from "../shared/shared.module";
import { ViewBookFeedbackComponent } from "./view-book-feedback/view-book-feedback.component";
import { ViewChapterFeedbackComponent } from "./view-chapter-feedback/view-chapter-feedback.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AuthorRoutingModule,
        SharedModule,
    ],
    declarations: [
        BookListComponent,
        ChapterListComponent,
        ViewBookFeedbackComponent,
        ViewChapterFeedbackComponent,
    ],
})
export class AuthorModule {}
