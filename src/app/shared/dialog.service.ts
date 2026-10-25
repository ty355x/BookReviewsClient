import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "./message-dialog/message-dialog.component";
import { Observable } from "rxjs";
import { PromptDialogComponent } from "./prompt-dialog/prompt-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private dialog: MatDialog) {
    }

    showMessage(title: string, message: string): Observable<any> {
        return this.dialog
            .open(MessageDialogComponent, { data: { title: title, message: message } })
            .afterClosed();
    }

    showPrompt(title: string, message: string): Observable<any> {
        return this.dialog
            .open(PromptDialogComponent, { data: { title: title, message: message } })
            .afterClosed();
    }
}
