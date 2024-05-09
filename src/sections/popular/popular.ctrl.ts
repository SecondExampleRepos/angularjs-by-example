'use strict';
import angular from 'angular';
type Show = any; // Define a more specific type if possible
interface PageValuesType {
    title: string;
    description: string;
}
angular
    .module('app.core')
    .controller('PopularController', function($scope: angular.IScope, PageValues: PageValuesType, shows: Show[]) {
        //Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";
        //Setup view model object
        var vm = this;
        vm.shows = shows;
    });