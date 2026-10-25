import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { KdpTrackUserService } from "../kdptrack-user.service";
import { DialogService } from "src/app/shared/dialog.service";

@Component({
    templateUrl: './import-kdptrack-users-dialog.component.html',
    styleUrls: ['./import-kdptrack-users-dialog.component.css']
})
export class ImportKDPTrackUsersDialogComponent implements OnInit {
    isLoading = false;

    view = 'select';
    users: any = [];
    selectedUsers: any = [];
    selectionCount = 0;

    constructor(private dialogRef: MatDialogRef<ImportKDPTrackUsersDialogComponent>, private kdptrackUserService: KdpTrackUserService,
        private dialogs: DialogService, @Inject(MAT_DIALOG_DATA) private data: any) {
    }

    ngOnInit(): void {
        this.findUsersToImport();
    }

    next() {
        let usersSelected = this.users.find((user: any) => user.import) !== undefined;

        if (!usersSelected) {
            this.dialogs.showMessage('Unable to Import Users', 'No users selected to import');
            return;
        }

        this.selectedUsers = this.users.filter((user: any) => user.import);
        this.view = 'confirm';
    }

    cancel() {
        this.dialogRef.close(false);
    }

    toggleImportUser(user: any) {
        user.import = !user.import;
        this.selectionCount = user.import ? this.selectionCount + 1 : this.selectionCount - 1;
    }

    import() {
        const userIds = this.selectedUsers.map((user: any) => user.id);
        this.kdptrackUserService
            .importUsers(userIds)
            .controller(this)
            .send((res: any) => this.onImportUsersResponse(res));
    }

    backToSelect() {
        this.view = 'select';
    }

    private findUsersToImport() {
        this.kdptrackUserService
            .findUsersToImport()
            .controller(this)
            .send((res: any) => this.onFindUsersToImportResponse(res));
    }

    private onFindUsersToImportResponse(res: any) {
        this.users = res.users;
        this.users.forEach((user: any) => user.import = false);
    }

    private onImportUsersResponse(res: any) {
        if (!res.success) {
            this.dialogs.showMessage('Unable to import users', res.error);
        } else {
            this.dialogs.showMessage('Import Success', 'Imported ' + res.imported + ' KDPTrack users');
            this.dialogRef.close(true);
        }
    }
}
