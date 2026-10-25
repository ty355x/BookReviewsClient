import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";
import { ApiCall } from "../shared/api-call";

@Injectable({
    providedIn: 'root'
})
export class AuthorBookService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findBooksForCurrentAuthor(): ApiCall {
        return ApiCall.create(
            this.httpClient.get(this.apiPath + '/author/books')
        );
    }
}
