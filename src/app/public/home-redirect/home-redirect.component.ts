import { Component, OnInit } from "@angular/core";
import { AppContext } from "src/app/shared/app-context/app-context.service";
import { UserNavService } from "src/app/shared/user-nav.service";

@Component({
    template: '',
})
export class HomeRedirectComponent implements OnInit {
    constructor(private appContext: AppContext, private userNav: UserNavService) {
    }

    ngOnInit(): void {
        if (this.appContext.isInitialized) {
            this.redirectToUserHome();
        } else {
            this.appContext.appContextInitCompleted.subscribe(() => {
                this.redirectToUserHome();
            })
        }
    }

    private redirectToUserHome() {
        this.userNav.navigateHome();
    }
}
