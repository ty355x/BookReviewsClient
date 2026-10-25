import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookSignupService } from "./book-signup.service";
import { LoginService } from "src/app/shared/login.service";
import { AppContext } from "src/app/shared/app-context/app-context.service";

@Component({
    templateUrl: './book-signup.component.html',
    styleUrls: ['./book-signup.component.css'],
})
export class BookSignupComponent implements OnInit {
    disableLoginForm = false;
    error: any = '';
    loginError: any = '';
    view = 'loading';
    signupCode: any = null;
    loginCredentials = { email: '', password: '' };
    book: any = null;

    constructor(private route: ActivatedRoute, private router: Router, private appContext: AppContext, private bookSignupService: BookSignupService, private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            if (params.hasOwnProperty('signupCode')) {
                this.signupCode = params.signupCode;
                this.activeSignupCode();
            }
        });
    }

    login() {
        this.disableLoginForm = true;
        this.loginError = null;

        if (!this.loginCredentials.email || !this.loginCredentials.password) {
            this.disableLoginForm = false;
            this.error = 'You must enter an email address and a password';
            return;
        }

        this.appContext.clear();

        this.loginService
            .login(this.loginCredentials.email, this.loginCredentials.password)
            .send((res: any) => this.onLoginResponse(res));
    }

    goHome() {
        this.router.navigate(['/']);
    }

    viewBook() {
        this.router.navigate(['reader/books/' + this.book.id + '/chapters']);
    }

    viewBookList() {
        this.router.navigate(['/reader/my-books']);
    }

    createAccount() {
        this.router.navigate(['/account-signup'], { queryParams: { bookSignupCode: this.signupCode } });
    }

    private onLoginResponse(res: any) {
        this.disableLoginForm = false;

        if (!res.success) {
            this.loginError = res.error;
            return;
        }

        this.appContext.setLoginContext(res.api_token, res.is_authenticated, res.user);
        this.activeSignupCode();
    }

    private activeSignupCode() {
        this.view = 'loading';
        this.error = false;

        this.bookSignupService
            .signup(this.signupCode)
            .fail((err: any) => this.handleError(err))
            .send((res: any) => this.onSignupResponse(res));
    }

    private onSignupResponse(res: any) {
        if (!res.success) {
            if (res.hasOwnProperty('loginRequired')) {
                this.view = 'login';
                return;
            } else {
                this.handleError(res.error);
            }
        } else {
            this.view = 'success';
            this.book = res.book;
        }
    }

    private handleError(err: any) {
        this.view = 'error';
        this.error = err;
    }
}
