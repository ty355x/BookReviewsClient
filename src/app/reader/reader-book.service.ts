import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";
import { ApiCall } from "../shared/api-call";

@Injectable({
    providedIn: 'root'
})
export class ReaderBookService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findBooksForCurrentReader(): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/reader/books'));
    }

    findBookWithChapters(bookId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/reader/books/' + bookId + '/chapters'));
    }

    findChapterContent(chapterId: number): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/reader/chapters/' + chapterId));
    }
}
