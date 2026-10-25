import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from "@angular/router";
import { AppContext } from "../shared/app-context/app-context.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthorGuard implements CanActivateChild {
    constructor(private router: Router, private appContext: AppContext) {
    }

    canActivateChild(childRoute: any, state: any) {
        if (this.appContext.isInitialized) {
            return this.canUserAccessPage(childRoute);
        } else {
            return Observable.create((subscriber: any) => {
                this.appContext.appContextInitCompleted.subscribe(() => {
                    subscriber.next(this.canUserAccessPage(childRoute));
                    subscriber.complete();
                });
            });
        }
    }

    private canUserAccessPage(childRoute: any) {
        if (this.appContext.isAuthenticated && this.appContext.user.role === 'author') {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
