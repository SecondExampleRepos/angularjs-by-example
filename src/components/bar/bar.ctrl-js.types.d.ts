// Derived from src/components/bar/bar.ctrl.js

export interface PageValues {
    // Define the structure of PageValues if known
}

export interface BarControllerScope extends angular.IScope {
    vm: BarControllerViewModel;
}

export interface BarControllerViewModel {
    data: PageValues;
}
