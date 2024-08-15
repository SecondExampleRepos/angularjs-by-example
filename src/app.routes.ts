'use strict';

import angular from 'angular';
import type { IRouteProvider } from 'angular-route';
import type { ShowService } from './app.routes-js.types';

angular
    .module('app.routes', ['ngRoute'])
    .config(config);

function config($routeProvider: IRouteProvider): void {
    $routeProvider
        .when('/', {
            templateUrl: 'sections/home/home.tpl.html',
            controller: 'HomeController as home'
        })
        .when('/premieres', {
            templateUrl: 'sections/premieres/premieres.tpl.html',
            controller: 'PremieresController as premieres',
            resolve: {
                shows: ['ShowService', (ShowService: ShowService) => {
                    return ShowService.getPremieres();
                }]
            }
        })
        .when('/search', {
            templateUrl: 'sections/search/search.tpl.html',
            controller: 'SearchController as search'
        })
        .when('/search/:query', {
            templateUrl: 'sections/search/search.tpl.html',
            controller: 'SearchController as search'
        })
        .when('/popular', {
            templateUrl: 'sections/popular/popular.tpl.html',
            controller: 'PopularController as popular',
            resolve: {
                shows: ['ShowService', (ShowService: ShowService) => {
                    return ShowService.getPopular();
                }]
            }
        })
        .when('/view/:id', {
            templateUrl: 'sections/view/view.tpl.html',
            controller: 'ViewController as view',
            resolve: {
                show: ['ShowService', '$route', (ShowService: ShowService, $route: angular.route.IRouteService) => {
                    return ShowService.get($route.current.params.id);
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
}
