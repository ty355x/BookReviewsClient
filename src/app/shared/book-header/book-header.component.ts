import { Component, Input } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-header',
    templateUrl: './book-header.component.html',
    styleUrls: ['./book-header.component.css'],
})
export class BookHeaderComponent {
    @Input() book: any;
    @Input() plain = false;
    @Input() centered = false;
    defaultBookCoverUrl = environment.assetsPath + '/book-covers/default.png';
}
