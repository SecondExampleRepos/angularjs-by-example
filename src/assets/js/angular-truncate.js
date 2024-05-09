angular.module('truncate', [])
.filter('characters', function (): (input: string, chars: number, breakOnWord: boolean) => string {
    return function (input: string, chars: number, breakOnWord: boolean): string {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            input = input.substring(0, chars);

            if (!breakOnWord) {
                let lastspace: number = input.lastIndexOf(' ');
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
.filter('words', function (): (input: string, words: number) => string {
    return function (input: string, words: number): string {
        if (isNaN(words)) return input;
        if (words <= 0) return '';
        if (input) {
            let inputWords: string[] = input.split(/\s+/);
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(' ') + '...';
            }
        }
        return input;
    };
});