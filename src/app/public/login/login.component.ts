import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/shared/login.service";
import { AppContext } from "src/app/shared/app-context/app-context.service";
import { UserNavService } from "src/app/shared/user-nav.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['../../shared/styles/account-management.css'],
})
export class LoginComponent implements OnInit {
    isLoading = false;
    error: any = null;
    credentials = { email: '', password: '' };

    constructor(private router: Router, private appContext: AppContext, private loginService: LoginService, private userNavService: UserNavService) {
    }

    ngOnInit(): void {
        if (this.loginService.lastLoginError) {
            this.error = this.loginService.lastLoginError;
            this.loginService.lastLoginError = null;
        }
    }

    login() {
        this.isLoading = true;

        if (!this.credentials.email || !this.credentials.password) {
            this.isLoading = false;
            this.error = 'You must enter an email address and a password';
            return;
        }

        this.appContext.clear();

        this.loginService
            .login(this.credentials.email, this.credentials.password)
            .controller(this)
            .send((res: any) => this.onLoginResponse(res));
    }

    resetPassword() {
        this.router.navigate(['/forgot-password']);
    }

    private onLoginResponse(res: any) {
        this.isLoading = false;

        if (!res.success) {
            this.error = res.error;
            return;
        }

        this.appContext.setLoginContext(res.api_token, res.is_authenticated, res.user);
        this.userNavService.navigateHome();
    }
}
