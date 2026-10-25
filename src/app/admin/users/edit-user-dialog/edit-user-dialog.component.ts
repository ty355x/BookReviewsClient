import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdminUserService } from "../admin-user.service";
import { UserRoleList } from "src/app/shared/user-role-list";

@Component({
    templateUrl: './edit-user-dialog.component.html',
})
export class EditUserDialogComponent {
    user: any = {};
    errors: any = {};
    isLoading = false;
    isCreating = true;
    userRoles = UserRoleList.roles;

    constructor(private dialogRef: MatDialogRef<EditUserDialogComponent>, private userService: AdminUserService,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        if (data) {
            this.user = data;
            this.isCreating = false;
        }
    }

    save() {
        this.errors = {};
        this.userService
            .saveUser(this.user)
            .subscribe(res => { this.onSaveUserResult(res); });
    }

    cancel() {
        this.dialogRef.close(false);
    }

    private onSaveUserResult(res: any) {
        if (res.success === true) {
            this.dialogRef.close(res.user_id);
        } else {
            this.errors = res.errors;
        }
    }
}
