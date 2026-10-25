import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppContext } from "src/app/shared/app-context/app-context.service";
import { UserNavService } from "src/app/shared/user-nav.service";

@Component({
    templateUrl: './kdptrack-login.component.html',
})
export class KdptrackLoginComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router, private appContext: AppContext, private userNavService: UserNavService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.onQueryParamsChanged(params);
        });
    }

    goHome() {
        this.userNavService.navigateHome();
    }

    goLogin() {
        this.router.navigate(['/login']);
    }

    private onQueryParamsChanged(params: any) {
        this.appContext.clear();
        const token = params.hasOwnProperty('token') ? params.token : null;

        if (!token) {
            this.goLogin();
            return;
        }

        this.appContext.setApiToken(token);
        this.appContext.loadAppContext(() => this.onLoadAppContextSuccess());
    }

    private onLoadAppContextSuccess() {
        if (!this.appContext.isAuthenticated) {
            this.goLogin();
            return;
        }

        this.router.navigate([this.appContext.user.getHomeRoute()]);
    }
}
