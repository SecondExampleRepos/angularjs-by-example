// Derived from src/sections/home/home.ctrl.js

export interface Tutorial {
    title: string;
    description: string;
    link: string;
}

export interface PageValues {
    title: string;
    description: string;
}

export interface HomeControllerScope extends ng.IScope {
    vm: HomeControllerViewModel;
}

export interface HomeControllerViewModel {
    tutorials: Tutorial[];
}
