import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BookSignupService } from "../book-signup/book-signup.service";
import { AccountSignupService } from "./account-signup.service";

@Component({
    templateUrl: './account-signup.component.html',
    styleUrls: ['./account-signup.component.css'],
})
export class AccountSignupComponent implements OnInit {
    isLoading = false;
    error: string|null = null;
    formErrors: any = [];
    bookSignupCode: any = null;
    account = { name: '', email: '', password: '', password_confirmation: '' };
    view = '';

    constructor(private route: ActivatedRoute, private accountSignupService: AccountSignupService, private bookSignupService: BookSignupService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => this.handleQueryParamsChanged(params));
    }

    createAccount() {
        this.clearErrors();

        this.accountSignupService.signup(this.account, this.bookSignupCode)
            .controller(this)
            .send((res: any) => this.onAccountSignupResponse(res));
    }

    private onAccountSignupResponse(res: any) {
        if (!res.success) {
            if (res.hasOwnProperty('error')) {
                this.error = res.error;
            }

            if (res.hasOwnProperty('formErrors')) {
                this.formErrors = res.formErrors;
            }
        } else {
            this.view = 'success';
        }
    }

    private handleQueryParamsChanged(params: any) {
        this.clearErrors();
        this.bookSignupCode = null;
        this.view = 'loading';

        if (!params.hasOwnProperty('bookSignupCode')) {
            this.error = 'Invalid book signup code';
            return;
        }

        this.bookSignupCode = params.bookSignupCode;
        this.verifyBookSignupCode();
    }

    private verifyBookSignupCode() {
        this.bookSignupService.verifyCode(this.bookSignupCode)
            .controller(this)
            .send((res: any) => this.onVerifyBookSignupCodeResponse(res));
    }

    private onVerifyBookSignupCodeResponse(res: any) {
        if (!res.success) {
            this.error = res.error;
        } else {
            this.view = 'signup';
        }
    }

    private clearErrors() {
        this.error = null;
        this.formErrors = [];
    }
}
