'use strict';

import { IController } from 'angular';
import type { PageValuesType, ShowType } from './popular.ctrl-js.types';

class PopularController implements IController {
    static $inject = ['$scope', 'PageValues', 'shows'];

    constructor(
        private $scope: angular.IScope,
        private PageValues: PageValuesType,
        private shows: ShowType[]
    ) {
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
