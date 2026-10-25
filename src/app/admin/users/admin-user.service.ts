import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/base.service";
import { ApiCall } from "src/app/shared/api-call";

@Injectable({
    providedIn: 'root',
})
export class AdminUserService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    getUsers(): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/admin/users'));
    }

    findUser(userId: number) {
        return this.httpClient.get(this.apiPath + '/admin/users/' + userId);
    }

    saveUser(user: any) {
        return this.httpClient.post(this.apiPath + '/admin/users', user);
    }
}
