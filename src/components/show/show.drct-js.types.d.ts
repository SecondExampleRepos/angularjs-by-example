// Derived from src/components/show/show.drct.js

export interface ShowDirectiveScope extends angular.IScope {
    show: Show;
    genres: string[];
}

export interface Show {
    id: number;
}

export interface ShowService {
    get(id: number): angular.IPromise<ShowResponse>;
}

export interface ShowResponse {
    genres: string[];
}
