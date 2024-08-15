// Derived from src/sections/premieres/premieres.ctrl.js

export interface PageValues {
    title: string;
    description: string;
}

export interface Show {
    // Define properties of a show object here
    // Example: id: number; name: string; etc.
}

export interface PremieresControllerScope extends angular.IScope {
    shows: Show[];
}

export class PremieresController {
    static $inject = ['$scope', 'shows', 'PageValues'];

    constructor(
        private $scope: PremieresControllerScope,
        private shows: Show[],
        private PageValues: PageValues
    ) {
        this.initialize();
    }

    private initialize(): void {
        // Set page title and description
        this.PageValues.title = "PREMIERES";
        this.PageValues.description = "Brand new shows showing this month.";
        // Setup view model object
        this.$scope.shows = this.shows;
    }
}
