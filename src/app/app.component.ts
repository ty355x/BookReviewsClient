import { Component, OnInit } from '@angular/core';
import { AppContext } from './shared/app-context/app-context.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    title = 'BookReviews';

    constructor(private appContext: AppContext) {
    }

    ngOnInit(): void {
        if (!this.appContext.isInitialized) {
            this.appContext.loadAppContext();
        }
    }
}
