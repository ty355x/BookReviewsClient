import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { UserAccountService } from "../user-account.service";

@Component({
    selector: 'app-edit-account-profile',
    templateUrl: './edit-account-profile.component.html',
    styleUrls: ['../user-account.css'],
})
export class EditAccountProfileComponent implements OnChanges {
    @Output() close = new EventEmitter<boolean>();
    @Input() user: any = null;

    isLoading = false;
    error: any = null;
    formErrors: any = [];
    formUser: any = null;

    constructor(private accountService: UserAccountService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.formUser = Object.assign({}, this.user);
    }

    save() {
        this.formErrors = [];

        this.accountService.updateAccount(this.formUser)
            .controller(this)
            .send((res: any) => this.onUpdateAccountResponse(res));
    }

    cancel() {
        this.close.emit(false);
    }

    private onUpdateAccountResponse(res: any) {
        if (!res.success) {
            this.formErrors = res.formErrors;
        } else {
            this.close.emit(true);
        }
    }
}
