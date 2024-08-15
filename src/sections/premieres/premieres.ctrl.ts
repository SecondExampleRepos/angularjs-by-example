'use strict';

import { IPageValues, IShow } from './premieres.ctrl-js.types';

class PremieresController {
    static $inject = ['$scope', 'shows', 'PageValues'];

    constructor(
        private $scope: ng.IScope,
        private shows: IShow[],
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
