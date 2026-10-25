import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoginService } from "../login.service";
import { BaseUser } from "./users/base-user";
import { Admin } from "./users/admin";
import { Reader } from "./users/reader";
import { Author } from "./users/author";
import { Guest } from "./users/guest";

@Injectable({ providedIn: 'root' })
export class AppContext {
    user: BaseUser = new Guest();
    apiToken: any = null;
    isAuthenticated = false;
    isInitialized = false;
    appContextInitCompleted = new Subject();
    appContextChanged = new Subject();

    constructor(private loginService: LoginService) {
    }

    setLoginContext(apiToken: string, isAuthenticated: boolean, user: any) {
        this.apiToken = apiToken;
        this.setUserContext(isAuthenticated, user);
        this.isInitialized = true;
        localStorage.setItem('api_token', this.apiToken);
        this.appContextChanged.next(null);
    }

    loadAppContext(successCallback: any = null) {
        this.apiToken = localStorage.getItem('api_token');

        this.loginService.getAppContext().send((res: any) => {
            this.onLoadAppContextResponse(res);

            if (successCallback !== null) {
                successCallback();
            }
        });
    }

    clear() {
        this.user = new Guest();
        this.apiToken = null;
        this.isAuthenticated = false;
        localStorage.setItem('api_token', '');
        this.appContextChanged.next(null);
    }

    setApiToken(apiToken: string) {
        localStorage.setItem('api_token', apiToken);
    }

    private onLoadAppContextResponse(res: any) {
        this.setUserContext(res.is_authenticated, res.user);
        this.isInitialized = true;
        this.appContextInitCompleted.next(null);
        this.appContextInitCompleted.complete();
        this.appContextChanged.next(null);
    }

    private setUserContext(isAuthenticated: boolean, user: any) {
        this.isAuthenticated = isAuthenticated;

        if (user.role === 'admin') {
            this.user = new Admin(user);
        } else if (user.role === 'reader') {
            this.user = new Reader(user);
        } else if (user.role === 'author') {
            this.user = new Author(user);
        } else {
            this.user = new Guest();
        }

        console.log(this.user);
    }
}
