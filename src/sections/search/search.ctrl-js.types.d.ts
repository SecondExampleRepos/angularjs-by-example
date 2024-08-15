// Derived from src/sections/search/search.ctrl.js

export interface PageValues {
    title: string;
    description: string;
}

export interface ShowService {
    search(query: string): Promise<Show[]>;
}

export interface Show {
    // Define properties of a Show object here
    // Example: id: number; name: string; etc.
}

export interface RouteParams {
    query?: string;
}

export interface SearchController {
    query: string | null;
    shows: Show[];
    loading: boolean | null;
    setSearch(): void;
    performSearch(query: string): void;
}
