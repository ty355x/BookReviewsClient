import { Component, OnInit } from "@angular/core";
import { ResetPasswordService } from "../reset-password.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
    isLoading = false;
    error: any = null;
    view = '';
    code: any = null;

    newPassword: any = null;
    newPasswordConfirm: any = null;

    constructor(private route: ActivatedRoute, private router: Router, private resetPasswordService: ResetPasswordService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            if (params.hasOwnProperty('code')) {
                this.code = params.code;
                this.validateCode();
            } else {
                this.showErrorPane('Invalid change password code');
            }
        });
    }

    resetPassword() {
        this.clearErrors();

        if (!this.validatePassword()) {
            return;
        }

        this.resetPasswordService
            .resetPassword(this.newPassword, this.code)
            .controller(this)
            .send((res: any) => this.onResetPasswordResponse(res));
    }

    login() {
        this.router.navigate(['/login']);
    }

    private onResetPasswordResponse(res: any) {
        if (!res.success && res.hasOwnProperty('error')) {
            this.error = res.error;
            return;
        } else {
            this.view = 'success';
        }
    }

    private validatePassword(): boolean {
        this.clearErrors();

        if (this.newPassword === null || this.newPassword.length < 3) {
            this.error = 'Password must contain at least 8 characters';
            return false;
        }

        if (this.newPassword.localeCompare(this.newPasswordConfirm) !== 0) {
            this.error = 'New Password and Confirm New Password don\'t match';
            return false;
        }

        return true;
    }

    private validateCode() {
        this.clearErrors();
        this.view = 'verifying';
        this.resetPasswordService
            .validateResetCode(this.code)
            .send((res: any) => this.onValidateResetCodeResponse(res));
    }

    private onValidateResetCodeResponse(res: any) {
        if (!res.success) {
            this.showErrorPane(res.error);
        } else {
            this.error = null;
            this.view = 'reset';
        }
    }

    private showErrorPane(error: string) {
        this.clearErrors();
        this.view = 'error';
        this.error = error;
    }

    private clearErrors() {
        this.error = null;
    }
}
