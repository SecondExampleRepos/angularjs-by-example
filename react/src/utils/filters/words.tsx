// Converted from src/assets/js/angular-truncate.js

export function words(input: string, words: number): string {
    if (isNaN(words)) return input;
    if (words <= 0) return '';
    if (input) {
        const inputWords = input.split(/\s+/);
        if (inputWords.length > words) {
            input = inputWords.slice(0, words).join(' ') + '...';
        }
    }
    return input;
}
