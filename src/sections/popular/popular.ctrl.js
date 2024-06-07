'use strict';
import { IController, IScope } from 'angular';

interface IPageValues {
    title: string;
    description: string;
}

interface IShow {
    // Define the properties of a show as needed
}

class PopularController implements IController {
    static $inject = ['$scope', 'PageValues', 'shows'];

    constructor(
        private $scope: IScope,
        private PageValues: IPageValues,
        private shows: IShow[]
    ) {
        this.init();
    }

    private init(): void {
        // Set page title and description
        this.PageValues.title = "POPULAR";
        this.PageValues.description = "The most popular TV shows.";
        // Setup view model object
        this.$scope.vm = this;
        this.$scope.vm.shows = this.shows;
    }
}

angular
    .module('app.core')
    .controller('PopularController', PopularController);