'use strict';
import angular from 'angular';
import { IPageValues } from './interfaces/IPageValues';
import { IBarControllerScope } from './interfaces/IBarControllerScope';
angular
    .module('app.core')
    .controller('BarController', function($scope: IBarControllerScope, PageValues: IPageValues) {
        //Setup the view model object
        var vm = this;
        vm.data = PageValues;
    });