import { Pipe, PipeTransform } from "@angular/core";
import { Util } from "../util";

@Pipe({
    name: 'nl2br',
})
export class nl2brPipe implements PipeTransform {
    transform(value: string): string {
        value = Util.escapeHtml(value);
        return value.replaceAll('\n', '<br>');
    }
}
