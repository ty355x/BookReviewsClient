import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiCall } from "src/app/shared/api-call";
import { BaseService } from "src/app/shared/base.service";

@Injectable({
    providedIn: 'root',
})
export class BookSignupService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    verifyCode(signupCode: string): ApiCall {
        const postData = { action: 'verify', signupCode : signupCode };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/book-signup', postData));
    }

    signup(signupCode: string): ApiCall {
        const postData = { signupCode : signupCode };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/book-signup', postData));
    }
}
