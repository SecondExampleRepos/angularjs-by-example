// Converted from src/assets/js/angular-truncate.js

export function characters(input: string, chars: number, breakOnWord: boolean): string {
    if (isNaN(chars)) return input;
    if (chars <= 0) return '';
    if (input && input.length > chars) {
        input = input.substring(0, chars);

        if (!breakOnWord) {
            const lastspace = input.lastIndexOf(' ');
            // get last space
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
}
