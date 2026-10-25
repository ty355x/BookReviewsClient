import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "src/app/shared/base.service";
import { ApiCall } from "../shared/api-call";

@Injectable({
    providedIn: 'root'
})
export class AuthorChapterService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findChapter(chapterId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/author/chapters/' + chapterId));
    }

    findChaptersForBook(bookId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/author/books/' + bookId));
    }
}
