import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AppContext } from './shared/app-context/app-context.service';
import { Router } from '@angular/router';
import { LoginService } from './shared/login.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router, private appContext: AppContext, private loginService: LoginService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiToken = this.appContext.apiToken;

        if (apiToken) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + apiToken)
            });
        }

        return next.
            handle(req)
            .pipe(map(event => this.onHttpEvent(event)))
            .pipe(catchError(err => this.onResponseError(err)));
    }

    private onHttpEvent(event: HttpEvent<any>) {
        if (event instanceof HttpResponse) {
            this.onResponse(event);
        }

        return event;
    }

    private onResponse(res: HttpResponse<any>) {
        if (res.hasOwnProperty('body') && res.body !== null && res.body.hasOwnProperty('_debug')) {
            console.error(res.body._debug);
        }
    }

    private onResponseError(err: any) {
        if (err.status === 401) {
            if (err.hasOwnProperty('error') && err.error !== null) {
                this.loginService.lastLoginError = err.error;
            }

            this.router.navigate(['/login']);
        }

        return throwError(() => new Error(err));
    }
}
