import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UserAccountService } from "../user-account.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['../user-account.css'],
})
export class ChangePasswordComponent {
    @Output() close = new EventEmitter();
    @Input() user: any = null;

    isLoading = false;
    error: any = null;
    formErrors: any = [];
    password: any = null;
    confirmPassword: any = null;

    constructor(private accountService: UserAccountService) {
    }

    save() {
        this.formErrors = [];

        this.accountService.changePassword(this.password, this.confirmPassword)
            .controller(this)
            .send((res: any) => this.onChangePasswordResult(res));
    }

    cancel() {
        this.close.emit();
    }

    private onChangePasswordResult(res: any) {
        if (!res.success) {
            this.formErrors = res.formErrors;
        } else {
            this.close.emit();
        }
    }
}
