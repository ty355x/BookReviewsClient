import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiCall } from "src/app/shared/api-call";
import { BaseService } from "src/app/shared/base.service";

@Injectable({
    providedIn: 'root',
})
export class KdpTrackUserService extends BaseService {
    constructor(private httpClient: HttpClient) {
        super();
    }

    findUsersToImport(): ApiCall {
        return ApiCall.create(this.httpClient.get(this.apiPath + '/admin/kdptrack/users-to-import'));
    }

    importUsers(kdptrackUserIds: any[]): ApiCall {
        const postData = { kdptrack_user_ids: kdptrackUserIds };
        return ApiCall.create(this.httpClient.post(this.apiPath + '/admin/kdptrack/import-users', postData));
    }
}
