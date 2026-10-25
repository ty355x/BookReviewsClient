import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/base.service";

@Injectable({
    providedIn: 'root'
})
export class AdminChapterService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findChaptersForBookWithFeedbackCount(bookId: number) {
        return this.httpClient.get(this.apiPath + '/admin/books/' + bookId + '/chapters');
    }

    findChapterWithNewestContent(chapterId: number) {
        return this.httpClient.get(this.apiPath + '/admin/chapters/' + chapterId + '/content');
    }

    findChapterWithVersions(chapterId: number) {
        return this.httpClient.get(this.apiPath + '/admin/chapters/' + chapterId + '/with-versions');
    }

    findChapterWithContent(contentId: number) {
        return this.httpClient.get(this.apiPath + '/admin/chapter-content/' + contentId);
    }

    createChapterAndContent(chapter: any, content: any) {
        const postData = { chapter: chapter, content: content };
        return this.httpClient.post(this.apiPath + '/admin/chapters/create', postData);
    }

    saveChapterContent(chapterId: number, bookChapterId: number, guidance: string, content: any) {
        const postParams = chapterId !== null ?
            { id: chapterId, book_chapter_id: bookChapterId, guidance: guidance, content: content } :
            { book_chapter_id: bookChapterId, guidance: guidance, content: content };

        return this.httpClient.post(this.apiPath + '/admin/chapter-content', postParams);
    }

    updateChapterTitle(chapter: any) {
        return this.httpClient.post(this.apiPath + '/admin/chapters/update-title', chapter);
    }

    reorderChapter(bookId: number, prevChapterIndex: number, newChapterIndex: number) {
        const postParams = { 'bookId': bookId, previousChapterIndex: prevChapterIndex, newChapterIndex: newChapterIndex };
        return this.httpClient.post(this.apiPath + '/admin/chapters/reorder', postParams);
    }
}
