'use strict';

import { ILocationService, IRouteParamsService } from 'angular';
import type { ShowServiceType, PageValuesType } from './search.ctrl-js.types';

angular
    .module('app.core')
    .controller('SearchController', function(
        $location: ILocationService,
        $routeParams: IRouteParamsService,
        ShowService: ShowServiceType,
        PageValues: PageValuesType
    ) {
        // Set page title and description
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";

        // Setup view model object
        const vm: {
            query: string | null;
            shows: any[];
            loading: boolean | null;
            setSearch: () => void;
            performSearch: (query: string) => void;
        } = this;

        vm.query = null;
        vm.shows = [];
        vm.loading = null;

        vm.setSearch = function() {
            const query = encodeURI(vm.query || '');
            $location.path('/search/' + query);
        };

        vm.performSearch = function(query: string) {
            vm.loading = true;
            ShowService.search(query).then(function(response: any) {
                vm.shows = response;
                vm.loading = false;
            });
        };

        if (typeof $routeParams.query !== "undefined") {
            vm.performSearch(decodeURI($routeParams.query));
            vm.query = decodeURI($routeParams.query);
        }
    });
