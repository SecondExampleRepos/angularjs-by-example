'use strict';
import angular from 'angular';
import { IPageValues, IShow, ICastResponse } from './interfaces';

angular
    .module('app.core')
    .controller('ViewController', ['$scope', '$location', 'PageValues', 'show', 'ShowService', '$routeParams', 
        function($scope: angular.IScope, $location: angular.ILocationService, PageValues: IPageValues, show: IShow, ShowService: any, $routeParams: angular.route.IRouteParamsService) {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;
        // Setup view model object
        var vm = this;
        vm.show = show;
        vm.setBannerImage = function(): { background: string, 'background-size': string, 'background-position': string } {
            return {
                'background': 'url() no-repeat',
                'background-size': '100%',
                'background-position': '100% 0%'
            };
        };
        vm.show.cast = [];
        ShowService.getCast(vm.show.id).then(function(response: ICastResponse){
            vm.show.cast = response.cast;
        });
    }]);

interface IShow {
    id: number;
    original_name: string;
    cast: any[];
}

interface ICastResponse {
    cast: any[];
}

interface IPageValues {
    title: string;
    description: string;
}
