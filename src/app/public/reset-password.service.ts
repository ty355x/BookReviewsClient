import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base.service";
import { ApiCall } from "../shared/api-call";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class ResetPasswordService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    submitEmail(email: string): ApiCall {
        const postData = { email: email };
        return ApiCall.create(this.httpClient.post(this.apiPath +  '/reset-password-code', postData));
    }

    validateResetCode(code: string): ApiCall {
        const postData = { action: 'validate', code: code };
        return ApiCall.create(this.httpClient.post(this.apiPath +  '/reset-password', postData));
    }

    resetPassword(password: string, code: string): ApiCall {
        const postData = { action: 'reset', password: password, code: code };
        return ApiCall.create(this.httpClient.post(this.apiPath +  '/reset-password', postData));
    }
}
