import { finalize, Observable } from "rxjs";

export class ApiCall {
    private observable: any;
    private controllerObj: any = null;
    private failCallback: any = null;
    private finallyCallback: any = null;

    private constructor(observable: any) {
        this.observable = observable;
    }

    static create(observable: Observable<any>): ApiCall {
        return new ApiCall(observable);
    }

    controller(controllerObj: any): ApiCall {
        this.controllerObj = controllerObj;
        return this;
    }

    fail(failCallback: any): ApiCall {
        this.failCallback = failCallback;
        return this;
    }

    finally(finallyCallback: any): ApiCall {
        this.finallyCallback = finallyCallback;
        return this;
    }

    send(successCallback: any): void {
        if (!successCallback) {
            throw new Error('No success callback specified for API call');
        }

        let subscribeParams: any = { next: successCallback };

        if (this.failCallback !== null) {
            subscribeParams.error = this.failCallback;
        }

        if (this.failCallback === null && this.controllerObj !== null && this.controllerObj.hasOwnProperty('error')) {
            subscribeParams.error = (err: any) => this.handleError(err);
        }

        if (this.controllerObj !== null && this.controllerObj.hasOwnProperty('isLoading')) {
            this.controllerObj.isLoading = true;
        }

        if (this.controllerObj !== null && this.controllerObj.hasOwnProperty('error')) {
            this.controllerObj.error = null;
        }

        this.observable
            .pipe(finalize(() => {
                if (this.controllerObj !== null && this.controllerObj.hasOwnProperty('isLoading')) {
                    this.controllerObj.isLoading = false;
                }

                if (this.finallyCallback !== null) {
                    this.finallyCallback();
                }

            }))
            .subscribe(subscribeParams);
    }

    private handleError(err: any) {
        this.controllerObj.error = 'Unable to process your request';
        console.error(err);
    }
}
