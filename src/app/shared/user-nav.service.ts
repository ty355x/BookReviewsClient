import { Router } from "@angular/router";
import { AppContext } from "./app-context/app-context.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UserNavService {
    constructor(private router: Router, private appContext: AppContext) {
    }

    navigateHome() {
        this.router.navigate([this.appContext.user.getHomeRoute()]);
    }

    navigateToBooks() {
        if (this.appContext.user.role === 'reader') {
            this.router.navigate(['/reader/my-books']);
        } else if (this.appContext.user.role === 'admin') {
            this.router.navigate(['/admin/books']);
        } else if (this.appContext.user.role === 'author') {
            this.router.navigate(['/author/books']);
        } else {
            this.router.navigate(['/login']);
        }
    }

    navigateToChapterList(bookId: number) {
        if (this.appContext.user.role === 'admin') {
            this.router.navigate(['/admin/books/' + bookId]);
        } else if (this.appContext.user.role === 'author') {
            this.router.navigate(['/author/books/' + bookId + '/chapters']);
        } else if (this.appContext.user.role === 'reader') {
            this.router.navigate(['/reader/books/' + bookId]);
        }
    }
}
