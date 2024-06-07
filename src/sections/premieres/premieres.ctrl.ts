'use strict';
import * as angular from 'angular';

interface IPageValues {
    title: string;
    description: string;
}

interface IShows {
    // Define the structure of the shows object here
}

class PremieresController {
    static $inject = ['$scope', 'shows', 'PageValues'];

    constructor(
        private $scope: angular.IScope,
        private shows: IShows[],
        private PageValues: IPageValues
    ) {
        // Set page title and description
        this.PageValues.title = "PREMIERES";
        this.PageValues.description = "Brand new shows showing this month.";
        // Setup view model object
        this.$scope.vm = this;
        this.$scope.vm.shows = this.shows;
    }
}

angular
    .module('app.core')
    .controller('PremieresController', PremieresController);