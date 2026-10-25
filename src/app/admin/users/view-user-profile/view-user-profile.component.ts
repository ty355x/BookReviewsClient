import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUserService } from '../admin-user.service';
import { finalize } from 'rxjs';

@Component({
    templateUrl: './view-user-profile.component.html',
})
export class ViewUserProfileComponent implements OnInit {
    error: null = null;
    isLoading = true;
    userId: any = null;
    user: any = null;
    assignedBooks: any = null;

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

    backToUsers() {
        this.router.navigate(['/admin/users']);
    }

    editUserProfile() {
        this.router.navigate(['/admin/users/' + this.user.id + '/edit-profile']);
    }

    editAssignedBooks() {
        this.router.navigate(['/admin/users/' + this.user.id + '/edit-assigned-books']);
    }

    private showUser() {
        this.error = null;
        this.isLoading = true;

        this.userService
            .findUser(this.userId)
            .pipe(finalize((() => this.isLoading = false)))
            .subscribe({
                next: (res: any) => { this.onFindUserResponse(res) },
                error: (err: any) => { this.error = err }
        });
    }

    private onFindUserResponse(res: any) {
        this.user = res.user;

        if (this.user.role === 'author') {
            this.assignedBooks = this.user.author_books;
        } else if (this.user.role === 'reader') {
            this.assignedBooks = this.user.reader_books;
        } else {
            this.assignedBooks = null;
        }
    }
}
