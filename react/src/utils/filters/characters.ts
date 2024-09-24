/**
 * Truncates a string to a specified number of characters, optionally breaking on the last word.
 * @param input - The input string to be truncated.
 * @param chars - The number of characters to truncate to.
 * @param breakOnWord - Whether to break on the last word or not.
 * @returns The truncated string with ellipsis if applicable.
 */
export function truncateCharacters(input: string, chars: number, breakOnWord: boolean = false): string {
    if (isNaN(chars)) return input;
    if (chars <= 0) return '';
    if (input && input.length > chars) {
        input = input.substring(0, chars);

        if (!breakOnWord) {
            const lastspace = input.lastIndexOf(' ');
            // Get last space
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
