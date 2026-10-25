import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent {
    title = '';
    message = '';

    constructor(private dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
        if (data) {
            this.title = data.title;
            this.message = data.message;
        }
    }

    close() {
        this.dialogRef.close(false);
    }
}
