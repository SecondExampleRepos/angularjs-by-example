/**
 * Truncate a string to a specified number of words.
 * 
 * @param input - The input string to be truncated.
 * @param words - The number of words to truncate the string to.
 * @returns The truncated string with an ellipsis if it exceeds the word limit.
 */
export function truncateWords(input: string, words: number): string {
    if (isNaN(words)) return input;
    if (words <= 0) return '';
    if (input) {
        const inputWords = input.split(/\s+/);
        if (inputWords.length > words) {
            return inputWords.slice(0, words).join(' ') + '...';
        }
    }
    return input;
}