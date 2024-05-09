'use strict';

import angular from 'angular';
import { IRouteProvider } from 'angular-route';

angular
    .module('app.routes', ['ngRoute'])
    .config(config);

type ShowServiceType = {
    getPremieres: () => Promise<any>;
    getPopular: () => Promise<any>;
    get: (id: string) => Promise<any>;
};

interface RouteResolve {
    shows?: () => Promise<any>;
    show?: (ShowService: ShowServiceType, $route: any) => Promise<any>;
}

function config($routeProvider: IRouteProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'sections/home/home.tpl.html',
            controller: 'HomeController as home'
        })
        .when('/premieres', {
            templateUrl: 'sections/premieres/premieres.tpl.html',
            controller: 'PremieresController as premieres',
            resolve: {
                shows: (ShowService: ShowServiceType): Promise<any> => {
                    return ShowService.getPremieres();
                }
            } as RouteResolve
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
                shows: (ShowService: ShowServiceType): Promise<any> => {
                    return ShowService.getPopular();
                }
            } as RouteResolve
        })
        .when('/view/:id', {
            templateUrl: 'sections/view/view.tpl.html',
            controller: 'ViewController as view',
            resolve: {
                show: (ShowService: ShowServiceType, $route: any): Promise<any> => {
                    return ShowService.get($route.current.params.id);
                }
            } as RouteResolve
        })
        .otherwise({
            redirectTo: '/'
        });
}