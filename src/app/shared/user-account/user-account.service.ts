import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { ApiCall } from "../api-call";

@Injectable({
    providedIn: 'root',
 })
 export class UserAccountService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findAccount(): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/user/account'));
    }

    updateAccount(user: any): ApiCall {
        const formData = { name: user.name, email: user.email, setting_reply_notifications: user.setting_reply_notifications };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/user/account', formData));
    }

    changePassword(password: string, confirmPassword: string): ApiCall {
        const formData = { password: password, password_confirmation: confirmPassword };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/user/account/change-password', formData));
    }
 }
