import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminChapterService } from '../admin-chapter.service';
import { finalize } from 'rxjs';

@Component({
    templateUrl: './edit-chapter-content.component.html',
})
export class EditChapterContentComponent implements OnInit {
    @ViewChild('richTextEditor') richTextEditor: any;

    paramsSubscribed = false;
    isLoading = false;
    error: any = null;
    formErrors: any = {};

    book: any = null;
    chapter: any = null;
    versions: any = [];
    contentMeta: any = null;

    constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private chapterService: AdminChapterService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.onPageParamsChanged(params);
        });
    }

    save() {
        this.isLoading = false;
        this.error = null;
        this.formErrors = {};
        this.chapterService
            .saveChapterContent(this.contentMeta.id, this.contentMeta.book_chapter_id, this.contentMeta.guidance, this.richTextEditor.getContent())
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: res => this.onSaveChapterResponse(res),
                error: err => this.error = err,
        });
    }

    cancel() {
        this.navigateToBook();
    }

    createNewVersion() {
        this.contentMeta = { id: null, book_chapter_id: this.chapter.id, guidance: '' };
        this.richTextEditor.setContent('');
    }

    editVersion(versionId: number) {
        this.router.navigate(['/admin/chapter-content/' + versionId]);
    }

    private onPageParamsChanged(params: any) {
        if (params.hasOwnProperty('chapterId')) {
            this.loadChapterContent(params['chapterId']);
        } else if (params.hasOwnProperty('contentId')) {
            this.loadChapterContentVersion(params['contentId']);
        } else {
            this.error = 'Unable to load chapter content';
        }
    }

    private loadChapterContent(chapterId: number) {
        this.clearPage();
        this.showChapterContent(chapterId);
    }

    private loadChapterContentVersion(contentId: number) {
        this.clearPage();
        this.showChapterContentVersion(contentId);
    }

    private showChapterContent(chapterId: number) {
        this.isLoading = true;
        this.error = null;
        this.formErrors = {};
        this.chapterService
            .findChapterWithNewestContent(chapterId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: res => this.onFindChapterContentResponse(res),
                error: err => this.error = err,
            });
    }

    private showChapterContentVersion(contentId: number) {
        this.isLoading = true;
        this.error = null;
        this.formErrors = {};
        this.chapterService
            .findChapterWithContent(contentId)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: res => this.onFindChapterContentResponse(res),
                error: err => this.error = err,
            });
    }

    private onFindChapterContentResponse(res: any) {
        this.book = res.book;
        this.chapter = res.chapter;
        this.contentMeta = res.content;
        this.versions = res.versions;

        if (this.versions.length > 0) {
            this.versions[0].version = this.versions[0].version + ' (latest)';
        }

        if (this.contentMeta === null) {
            this.createNewVersion();
        }

        this.isLoading = false;
        this.changeDetector.detectChanges();
        this.richTextEditor.setContent(this.contentMeta.content);
        this.contentMeta.content = null;
    }

    private onSaveChapterResponse(res: any) {
        if (res.success) {
            this.navigateToBook();
        } else {
            this.formErrors = res.errors;
        }
    }

    private navigateToBook() {
        this.router.navigate(['/admin/books/' + this.book.id]);
    }

    private clearPage() {
        this.error = null;
        this.formErrors = {};
        this.book = null;
        this.chapter = null;
        this.contentMeta = null;
        this.versions = null;
    }
}
