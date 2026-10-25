import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { AppContext } from "./app-context/app-context.service";

@Injectable(
    { providedIn: 'root' }
)
export class FontSizeService extends BaseService {
    fontSizeIndex = 0;
    fontSizeLabel = '100%';
    private labelList = ['100%', '125%', '150%', '175%'];
    private classList = ['', 'font-size-1', 'font-size-2', 'font-size-3'];

    constructor(private appContext: AppContext, private httpClient: HttpClient) {
        super();
        this.appContext.appContextChanged.subscribe(() => { this.onAppContextChanged() });
    }

    setFontSizeAndSave(index: number) {
        this.setFontSize(index);
        this.saveFontSize();
    }

    private setFontSize(index: number) {
        if (index < 0 || index > this.fontSizeLabel.length) {
            this.fontSizeIndex = 0;
            this.fontSizeLabel = this.labelList[0];
            this.setFontClass(0);
            return;
        }

        this.fontSizeIndex = index;
        this.fontSizeLabel = this.labelList[index];
        this.setFontClass(index);
    }

    private setFontClass(index: number) {
        for(let className of this.classList) {
            if (className !== '') {
                document.documentElement.classList.remove(className);
            }
        }

        const className = this.classList[index];

        if (className !== '') {
            document.documentElement.classList.add(this.classList[index]);
        }
    }

    private saveFontSize() {
        const path = this.appContext.user.role === 'admin' ?
            this.apiPath + '/admin/account/font-size' :
            this.apiPath + '/user/account/font-size';

        const postData = { 'fontSize': this.fontSizeIndex };
        this.httpClient.post(path, postData).subscribe((res: any) => {});
    }

    private onAppContextChanged() {
        this.setFontSize(this.appContext.user.fontSize);
    }
}
