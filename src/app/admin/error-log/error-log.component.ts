import { Component, OnInit } from "@angular/core";
import { ErrorLogService } from "./error-log.service";

@Component({
    templateUrl: './error-log.component.html',
})
export class ErrorLogComponent implements OnInit {
    isLoading = false;
    error: any = null;
    errors: any = null;

    constructor(private errorLogService: ErrorLogService) {

    }

    ngOnInit(): void {
        this.errorLogService
            .findErrors()
            .controller(this)
            .send((res: any) => this.onErrorLogResponse(res));
    }

    private onErrorLogResponse(res: any) {
        this.errors = res.errors;
    }
}
