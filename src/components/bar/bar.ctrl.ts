'use strict';
import * as angular from 'angular';

interface PageValues {
    // Define the properties of PageValues here
}

class BarController {
    static $inject = ['$scope', 'PageValues'];

    data: PageValues;

    constructor(private $scope: angular.IScope, PageValues: PageValues) {
        this.data = PageValues;
    }
}

angular
    .module('app.core')
    .controller('BarController', BarController);