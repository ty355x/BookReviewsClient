import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AdminChapterService } from "../admin-chapter.service";

@Component({
    templateUrl: './edit-chapter-title-dialog.component.html',
})
export class EditChapterTitleDialogComponent {
    isLoading = false;
    errors: any = {};
    chapter: any = {};

    constructor(private dialogRef: MatDialogRef<EditChapterTitleDialogComponent>, private chapterService: AdminChapterService,
        @Inject(MAT_DIALOG_DATA) private data: any) {
        if (data) {
            this.chapter = data;
        }
    }

    save() {
        this.errors = {};
        this.chapterService
            .updateChapterTitle(this.chapter)
            .subscribe(res => { this.onUpdateChapterTitleResponse(res); });
    }

    cancel() {
        this.dialogRef.close(false);
    }

    toggleAutoTitle() {
        this.chapter.auto_title = !this.chapter.auto_title;
    }

    private onUpdateChapterTitleResponse(res: any) {
        if (res.success === true) {
            this.dialogRef.close(res.user_id);
        } else {
            this.errors = res.errors;
        }
    }
}
