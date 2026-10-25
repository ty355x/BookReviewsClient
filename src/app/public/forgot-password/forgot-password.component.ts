import { Component } from "@angular/core";
import { ResetPasswordService } from "../reset-password.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../../shared/styles/account-management.css'],
})
export class ForgotPasswordComponent {
    isLoading = false;
    error: any = null;
    email: any = null;
    showSuccessMessage = false;

    constructor(private router: Router, private resetPasswordService: ResetPasswordService) {
    }

    submit() {
        this.error = null;

        if (this.email === null || this.email.length === 0) {
            this.error = 'You must enter an email address';
            return;
        }

        this.resetPasswordService
            .submitEmail(this.email)
            .controller(this)
            .send((res: any) => this.onSubmitEmailResponse(res));
    }

    backToLogin() {
        this.router.navigate(['/login']);
    }

    private onSubmitEmailResponse(res: any) {
        if (res.success) {
            this.showSuccessMessage = true;
        } else if (!res.success) {
            this.error = res.error;
        }
    }
}
