// Derived from src/sections/popular/popular.ctrl.js

export interface PageValues {
    title: string;
    description: string;
}

export interface Show {
    // Define properties of a show object here
    // Example: id: number; name: string; etc.
}

export interface PopularControllerScope extends angular.IScope {
    vm: {
        shows: Show[];
    };
}

export type PopularController = (
    $scope: PopularControllerScope,
    PageValues: PageValues,
    shows: Show[]
) => void;
