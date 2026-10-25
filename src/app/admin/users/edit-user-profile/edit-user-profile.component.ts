import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../admin-user.service';
import { UserRoleList } from 'src/app/shared/user-role-list';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './edit-user-profile.component.html',
})
export class EditUserProfileComponent implements OnInit {
    isLoading = true;
    error: any = null;
    userId: any = null;
    user: any = null;
    formErrors: any = {};
    userRoles = UserRoleList.roles;
    isBusy = false;

    constructor(private route: ActivatedRoute, private router: Router, private userService: AdminUserService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((param: any) => {
            if (param.hasOwnProperty('userId')) {
                this.userId = param.userId;
                this.showUser();
            }
        });
    }

    save() {
        this.formErrors = {};
        this.isBusy = true;

        this.userService
            .saveUser(this.user)
            .pipe(finalize(() => this.isBusy = false))
            .subscribe({
                next: (res: any) => { this.onSaveUserResponse(res); },
                error: (err: any) => { this.error = err; }
            });
    }

    cancel() {
        this.router.navigate(['/admin/users/' + this.userId ]);
    }

    private onSaveUserResponse(res: any) {
        if (!res.success) {
            this.formErrors = res.errors;
        } else {
            this.router.navigate(['/admin/users/' + this.userId ]);
        }
    }

    private showUser() {
        this.error = null;
        this.formErrors = {};
        this.isLoading = true;

        this.userService
            .findUser(this.userId)
            .pipe(finalize((() => this.isLoading = false)))
            .subscribe({
                next: (res: any) => { this.user = res.user; },
                error: (err: any) => { this.error = err; }
        });
    }
}
