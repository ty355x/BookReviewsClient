import { Component, OnInit } from "@angular/core";
import { UserAccountService } from "./user-account.service";

@Component({
    templateUrl: './user-account.component.html',
})
export class UserAccountComponent implements OnInit {
    isLoading = false;
    error: any = null;

    view = 'profile';
    user: any = null;

    constructor(private accountService: UserAccountService) {
    }

    ngOnInit(): void {
        this.refreshUser();
    }

    showEditProfile() {
        this.view = 'edit-profile';
    }

    showChangePassword() {
        this.view = 'change-password';
    }

    closeEditProfile(refreshUser: boolean) {
        this.view = 'profile';
        this.refreshUser(refreshUser);
    }

    closeChangePassword() {
        this.view = 'profile';
    }

    private refreshUser(showLoading = true) {
        this.error = null;

        if (showLoading) {
            this.isLoading = true;
        }

        this.accountService.findAccount()
            .finally(() => this.isLoading = false )
            .fail((err: any) => this.error = err)
            .send((res: any) => this.onViewAccountResponse(res));
    }

    private onViewAccountResponse(res: any) {
        this.user = res.user;
    }
}
