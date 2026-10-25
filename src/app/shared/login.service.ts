import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { ApiCall } from "./api-call";

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {
    lastLoginError = null;

    constructor(private httpClient: HttpClient) {
        super();
    }

    login(email: string, password: string): ApiCall {
        const postData = { email: email, password: password };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/login', postData));
    }

    logout(): ApiCall {
        return ApiCall.create(this.httpClient.post(this.apiPath + '/logout', {}));
    }

    getAppContext(): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/app-context'));
    }
}
