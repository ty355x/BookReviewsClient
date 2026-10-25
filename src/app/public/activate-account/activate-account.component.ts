import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountSignupService } from "../account-signup/account-signup.service";

@Component({
    templateUrl: './activate-account.component.html',
    styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
    isLoading = false;
    error:any = null;
    view = '';
    code: any = null;

    constructor(private route: ActivatedRoute, private router: Router, private accountSignupService: AccountSignupService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => this.handleQueryParamsChanged(params));
    }

    login() {
        this.router.navigate(['/login']);
    }

    private handleQueryParamsChanged(params: any) {
        this.clear();
        this.view = 'loading';

        if (params.hasOwnProperty('code')) {
            this.code = params.code;
            this.activateAccount();
        } else {
            this.error = 'Invalid account activation code';
        }
    }

    private activateAccount() {
        this.accountSignupService.activateAccount(this.code)
            .controller(this)
            .send((res: any) => this.onActivateAccountResponse(res));
    }

    private onActivateAccountResponse(res: any) {
        if (!res.success) {
            this.error = res.error;
        } else {
            this.view = 'success';
        }
    }

    private clear() {
        this.isLoading = false;
        this.error = null;
        this.view = '';
    }
}
