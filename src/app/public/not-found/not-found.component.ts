import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppContext } from "src/app/shared/app-context/app-context.service";
import { UserNavService } from "src/app/shared/user-nav.service";

@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
    showHomeButton = false;
    showLoginButton = false;

    constructor(private router: Router, private appContext: AppContext, private userNavService: UserNavService) {
    }

    ngOnInit(): void {
        if (this.appContext.isInitialized) {
            this.checkShowHomeButton();
        } else {
            this.appContext.appContextInitCompleted.subscribe(() => this.checkShowHomeButton());
        }
    }

    checkShowHomeButton() {
        if (this.appContext.isAuthenticated) {
            this.showHomeButton = true;
            this.showLoginButton = false;
        } else {
            this.showHomeButton = false;
            this.showLoginButton = true;
        }
    }

    goHome() {
        this.userNavService.navigateHome();
    }

    goLogin() {
        this.router.navigate(['/login']);
    }
}
