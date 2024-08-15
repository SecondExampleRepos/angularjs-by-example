// Derived from src/assets/js/angular-truncate.js

export type TruncateInput = string | null | undefined;

export type CharactersFilter = (input: TruncateInput, chars: number, breakOnWord: boolean) => string;

export type WordsFilter = (input: TruncateInput, words: number) => string;
