'use strict';

import { ILocationService } from 'angular';
import type { PageValuesType, ShowType, ShowServiceType } from './view.ctrl-js.types';

angular
    .module('app.core')
    .controller('ViewController', function(
        $scope: ng.IScope,
        $location: ILocationService,
        PageValues: PageValuesType,
        show: ShowType,
        ShowService: ShowServiceType,
        $routeParams: ng.route.IRouteParamsService
    ) {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        // Setup view model object
        const vm: any = this;
        vm.show = show;
        vm.setBannerImage = function(): { [key: string]: string } {
            return {
                'background': 'url() no-repeat',
                'background-size': '100%',
                'background-position': '100% 0%'
            };
        };
        vm.show.cast = [];
        ShowService.getCast(vm.show.id).then(function(response: { cast: any[] }) {
            vm.show.cast = response.cast;
        });
    });
