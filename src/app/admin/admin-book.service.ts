import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";

@Injectable({
    providedIn: 'root',
})
export class AdminBookService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findBook(bookId: number) {
        return this.httpClient.get(this.apiPath + '/admin/books/' + bookId);
    }

    findAllBooks() {
        return this.httpClient.get(this.apiPath + '/admin/books');
    }

    saveBook(book: any) {
        return this.httpClient.post(this.apiPath + '/admin/books', book);
    }

    makeSignupCode(bookId: number) {
        const postData = { bookId: bookId };
        return this.httpClient.post(this.apiPath + '/admin/books/make-signup-code', postData);
    }

    deleteSignupCode(bookId: number) {
        const postData = { bookId: bookId };
        return this.httpClient.post(this.apiPath + '/admin/books/delete-signup-code', postData);
    }
}
