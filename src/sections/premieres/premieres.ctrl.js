'use strict';
import angular from 'angular';
import { IPageValues, IShow } from './interfaces';
angular
    .module('app.core')
    .controller('PremieresController', function($scope: angular.IScope, shows: IShow[], PageValues: IPageValues) {
        //Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";
        //Setup view model object
        const vm = this;
        vm.shows = shows;
    });