// src/utils/filters/characters.ts

export function truncateCharacters(input: string, length: number): string {
    if (input.length <= length) {
        return input;
    }
    return input.substring(0, length) + '...';
}
