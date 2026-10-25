import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BookSignupComponent } from './book-signup/book-signup.component';
import { HomeRedirectComponent } from './home-redirect/home-redirect.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountSignupComponent } from './account-signup/account-signup.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { KdptrackLoginComponent } from './kdptrack-login/kdptrack-login.component';

const routes: Routes = [
    { path: '', component: HomeRedirectComponent },
    { path: 'book-signup', component: BookSignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'account-signup', component: AccountSignupComponent },
    { path: 'activate-account', component: ActivateAccountComponent },
    { path: 'kdptrack-login', component: KdptrackLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {}
