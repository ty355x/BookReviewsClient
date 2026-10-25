import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../admin-user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { Router } from '@angular/router';
import { ImportKDPTrackUsersDialogComponent } from '../import-kdptrack-users-dialog/import-kdptrack-users-dialog.component';

@Component({
    templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
    isLoading = true;
    error: any = null;
    allUsers: any[] = [];
    filteredUsers: any[] = [];
    userFilter = { role: 'all', searchText: '' };

    constructor(private router: Router, private dialog: MatDialog, private userService: AdminUserService) {
    }

    ngOnInit(): void {
        this.listUsers();
    }

    addUser(): void {
        this.dialog
            .open(EditUserDialogComponent, {})
            .afterClosed().subscribe(result => {
                if (result) {
                    this.router.navigate(['/admin/users/' + result]);
                }
        });
    }

    viewUser(userId: number): void {
        this.router.navigate(['/admin/users/' + userId]);
    }

    setUserRoleFilter(role: string) {
        this.userFilter.role = role;
        this.filterAndSortUsers();
    }

    onFilterSearchTextChange(e: any) {
        this.filterAndSortUsers();
    }

    importUsers() {
        this.dialog
            .open(ImportKDPTrackUsersDialogComponent, {})
            .afterClosed().subscribe(dialogResult => this.onImportUsersDialogClosed(dialogResult));
    }

    private listUsers() {
        this.userService
            .getUsers()
            .controller(this)
            .send((res: any) => this.onGetUsersResponse(res));
    }

    private onGetUsersResponse(res: any): void {
        this.allUsers = res.users;
        this.filterAndSortUsers();
    }

    private filterAndSortUsers() {
        this.filterUsers();
        this.sortUsers();
    }

    private filterUsers() {
        this.filteredUsers = this.allUsers.filter(user => {
            if (this.userFilter.role !== 'all' && user.role !== this.userFilter.role) {
                return false;
            }

            if (this.userFilter.searchText !== '') {
                const userName = user.name.toLowerCase();
                const userEmail = user.email.toLowerCase();
                const searchText = this.userFilter.searchText.toLowerCase();

                if (!(userName.includes(searchText) || userEmail.includes(searchText))) {
                    return false;
                }
            }

            return true;
        });
    }

    private sortUsers() {
        this.filteredUsers.sort((a: any, b: any) => {
            if (a.role !== b.role) {
                const aRole = a.role === 'author' ? 0 : a.role === 'reader' ? 1 : 2;
                const bRole = b.role === 'author' ? 0 : b.role === 'reader' ? 1 : 2;
                return aRole - bRole;
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    }

    private onImportUsersDialogClosed(dialogResult: any) {
        if (dialogResult) {
            this.listUsers();
        }
    }
}
