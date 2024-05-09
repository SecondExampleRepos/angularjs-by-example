'use strict';
import angular from 'angular';
import { IPageValues, IShow } from './interfaces'; // Assuming interfaces are defined in a separate file
angular
    .module('app.core')
    .controller('PremieresController', ['PageValues', 'shows', function(PageValues: IPageValues, shows: IShow[]) {
        // Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";
        // Setup view model object
        const vm = this;
        vm.shows = shows;
    }]);