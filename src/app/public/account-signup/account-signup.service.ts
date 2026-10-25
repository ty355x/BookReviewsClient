import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiCall } from "src/app/shared/api-call";
import { BaseService } from "src/app/shared/base.service";

@Injectable({
    providedIn: 'root',
})
export class AccountSignupService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    signup(account: any, bookSignupCode: string): ApiCall {
        const postData = { account: account, bookSignupCode: bookSignupCode };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/account-signup', postData));
    }

    activateAccount(code: string): ApiCall {
        const postData = { code: code };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/account-activate', postData));
    }
}
