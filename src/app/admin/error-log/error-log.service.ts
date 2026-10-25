import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiCall } from "src/app/shared/api-call";
import { BaseService } from "src/app/shared/base.service";

@Injectable({
    providedIn: 'root',
})
export class ErrorLogService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findErrors(): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/admin/error-log'));
    }
}
