import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";

@Injectable({
    providedIn: 'root',
})
export class AdminAssignedBookService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findAvailableBooksForAuthor(authorId: number) {
        return this.httpClient.get(this.apiPath + '/admin/assigned-books/available-books-for-author/' + authorId);
    }

    findAvailableBooksForReader(readerId: number) {
        return this.httpClient.get(this.apiPath + '/admin/assigned-books/available-books-for-reader/' + readerId);
    }

    saveAuthorBooks(authorId: number, bookIds: []) {
        const postData = { authorId: authorId, bookIds: bookIds };
        return this.httpClient.post(this.apiPath + '/admin/assigned-books/save-author-books', postData);
    }

    saveReaderBooks(readerId: number, bookIds: []) {
        const postData = { readerId: readerId, bookIds: bookIds };
        return this.httpClient.post(this.apiPath + '/admin/assigned-books/save-reader-books', postData);
    }
}
