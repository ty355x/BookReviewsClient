import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppContext } from 'src/app/shared/app-context/app-context.service';
import { FontSizeService } from 'src/app/shared/font-size-service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './site-layout.component.html',
    styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent implements OnInit {
    username: any = null;
    userRole: any = null;

    constructor(private router: Router, private appContext: AppContext, private loginService: LoginService, public fontSizeService: FontSizeService) {
    }

    ngOnInit(): void {
        this.username = this.appContext.user.name;
        this.userRole = this.appContext.user.role;
    }

    logout() {
        this.loginService.logout().send((res: any) => {
            this.appContext.clear();
            this.router.navigate(['/login']);
        });
    }

    changeFontSize(event: any) {
        this.fontSizeService.setFontSizeAndSave(event.target.value);
    }
}
