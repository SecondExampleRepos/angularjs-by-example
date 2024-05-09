'use strict';
import angular from 'angular';

enum PageTitles {
    POPULAR = "POPULAR"
}

interface IPageValues {
    title: PageTitles;
    description: string;
}

interface IShow {
    // Define properties of a show
}

angular
    .module('app.core')
    .controller('PopularController', ['$scope', 'PageValues', 'shows', 
        ($scope: angular.IScope, PageValues: IPageValues, shows: IShow[]) => {
            // Set page title and description
            PageValues.title = PageTitles.POPULAR;
            PageValues.description = "The most popular TV shows.";
            // Setup view model object
            const vm = this;
            vm.shows = shows;
        }
    ]);
