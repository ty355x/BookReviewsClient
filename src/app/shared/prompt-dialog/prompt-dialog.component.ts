import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    templateUrl: './prompt-dialog.component.html',
})
export class PromptDialogComponent {
    title = '';
    message = '';

    constructor(private dialogRef: MatDialogRef<PromptDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
        if (data) {
            this.title = data.title;
            this.message = data.message;
        }
    }

    confirm() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close(false);
    }
}
