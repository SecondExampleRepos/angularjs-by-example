import * as angular from 'angular';
type TruncateFilter = (input: string, limit: number, breakOnWord?: boolean) => string;
enum FilterType {
    Characters = 'characters',
    Words = 'words'
}
angular.module('truncate', [])
.filter(FilterType.Characters, function (): TruncateFilter {
    return function (input: string, chars: number, breakOnWord: boolean = false): string {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            input = input.substring(0, chars);
            if (!breakOnWord) {
                const lastspace = input.lastIndexOf(' ');
                //get last space
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace);
                }
            } else {
                while (input.charAt(input.length - 1) === ' ') {
                    input = input.substr(0, input.length - 1);
                }
            }
            return input + '...';
        }
        return input;
    };
})
.filter(FilterType.Words, function (): TruncateFilter {
    return function (input: string, words: number): string {
        if (isNaN(words)) return input;
        if (words <= 0) return '';
        if (input) {
            const inputWords = input.split(/\s+/);
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(' ') + '...';
            }
        }
        return input;
    };
});