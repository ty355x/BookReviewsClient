import { Component, EventEmitter, Input,  Output } from "@angular/core";

@Component({
    selector: 'app-view-account',
    templateUrl: './view-account.component.html',
    styleUrls: ['../user-account.css'],
})
export class ViewAccountComponent {
    @Output() showEditProfile = new EventEmitter();
    @Output() showChangePassword = new EventEmitter();
    @Input() user: any = null;

    isLoading = false;
    error: any = null;

    editProfile() {
        this.showEditProfile.emit();
    }

    changePassword() {
        this.showChangePassword.emit();
    }
}
