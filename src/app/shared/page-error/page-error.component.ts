import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-page-error',
    templateUrl: './page-error.component.html',
    styleUrls: ['./page-error.component.css'],
})
export class PageErrorComponent implements OnChanges {
    @Input() title: any = null;
    @Input() error: any;
    errorMessage: any = null;
    private defaultErrorMessage = 'Unable to process your request';

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('error')) {
            this.showErrorMessage();
        }
    }

    private showErrorMessage() {
        if (typeof(this.error) === 'string') {
            this.errorMessage = this.error;
        } else if (typeof(this.error) === 'object') {
            this.showErrorObjectMessage();
        } else {
            this.errorMessage = this.defaultErrorMessage;
        }
    }

    private showErrorObjectMessage() {
        if (this.error.hasOwnProperty('error') && this.error.hasOwnProperty('message') && this.error.error.message) {
            this.errorMessage = this.error.error.message;
        } else if (this.error.hasOwnProperty('status') && this.error.hasOwnProperty('statusText')) {
            this.errorMessage = this.error.status + ' - ' + this.error.statusText;
        } else {
            this.errorMessage = this.defaultErrorMessage;
        }
    }
}
