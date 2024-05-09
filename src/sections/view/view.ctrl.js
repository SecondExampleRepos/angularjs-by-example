'use strict';
import angular from 'angular';
interface PageValuesType {
    title: string;
    description: string;
}
interface ShowType {
    original_name: string;
    id: number;
    cast: CastMember[];
}
interface CastMember {
    // Define properties for CastMember as needed
}
angular
    .module('app.core')
    .controller('ViewController', function($scope: any, $location: any, PageValues: PageValuesType, show: ShowType, ShowService: any, $routeParams: any) {
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
        ShowService.getCast(vm.show.id).then(function(response: { cast: CastMember[] }) {
            vm.show.cast = response.cast;
        });
    });