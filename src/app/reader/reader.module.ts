import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReaderRoutingModule } from "./reader.routing";
import { ReviewChapterComponent } from "./review-chapter/review-chapter.component";
import { ViewChaptersComponent } from "./view-chapters/view-chapters.component";
import { SharedModule } from "../shared/shared.module";
import { ViewBooksComponent } from "./view-books/view-books.component";
import { ReaderBookListComponent } from "./view-books/reader-book-list/reader-book-list.component";
import { ReaderUnreviewedChapters } from "./view-books/reader-unreviewed-chapters/reader-unreviewed-chapters.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReaderRoutingModule,
        SharedModule,
    ],
    declarations: [
        ViewBooksComponent,
        ReviewChapterComponent,
        ViewChaptersComponent,
        ReaderBookListComponent,
        ReaderUnreviewedChapters,
    ],
})
export class ReaderModule {}
