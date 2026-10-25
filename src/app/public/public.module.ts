import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./login/login.component";
import { PublicRoutingModule } from "./public-routing.module";
import { SiteLayoutComponent } from "./site-layout/site-layout.component";
import { HomeRedirectComponent } from "./home-redirect/home-redirect.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { BookSignupComponent } from "./book-signup/book-signup.component";
import { AccountSignupComponent } from "./account-signup/account-signup.component";
import { ActivateAccountComponent } from "./activate-account/activate-account.component";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        SharedModule,
        PublicRoutingModule,
    ],
    declarations: [
        BookSignupComponent,
        ForgotPasswordComponent,
        HomeRedirectComponent,
        LoginComponent,
        NotFoundComponent,
        ResetPasswordComponent,
        SiteLayoutComponent,
        AccountSignupComponent,
        ActivateAccountComponent,
    ],

})
export class PublicModule {}
