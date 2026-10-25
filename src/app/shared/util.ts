export class Util {
    static escapeHtml(text: string): string {
        const escaper = document.createElement('textarea');
        escaper.innerHTML = text;
        return escaper.value;
    }
}
