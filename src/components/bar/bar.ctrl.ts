'use strict';
import angular from 'angular';
import { IPageValues, IBarControllerScope } from './types';
angular
    .module('app.core')
    .controller('BarController', ['$scope', 'PageValues', 
        function($scope: IBarControllerScope, PageValues: IPageValues) {
        //Setup the view model object
        const vm = this;
        vm.data = PageValues;
    }]);