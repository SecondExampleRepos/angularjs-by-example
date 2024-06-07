'use strict';
import angular from 'angular';
import { IRouteProvider } from 'angular-route';
enum Routes {
    Home = '/',
    Premieres = '/premieres',
    Search = '/search',
    SearchQuery = '/search/:query',
    Popular = '/popular',
    View = '/view/:id'
}
interface IShowService {
    getPremieres(): Promise<any>;
    getPopular(): Promise<any>;
    get(id: string): Promise<any>;
}
angular
    .module('app.routes', ['ngRoute'])
    .config(config);
config.$inject = ['$routeProvider'];
function config($routeProvider: IRouteProvider) {
    $routeProvider
        .when(Routes.Home, {
            templateUrl: 'sections/home/home.tpl.html',
            controller: 'HomeController as home'
        })
        .when(Routes.Premieres, {
            templateUrl: 'sections/premieres/premieres.tpl.html',
            controller: 'PremieresController as premieres',
            resolve: {
                shows: ['ShowService', (ShowService: IShowService) => {
                    return ShowService.getPremieres();
                }]
            }
        })
        .when(Routes.Search, {
            templateUrl: 'sections/search/search.tpl.html',
            controller: 'SearchController as search'
        })
        .when(Routes.SearchQuery, {
            templateUrl: 'sections/search/search.tpl.html',
            controller: 'SearchController as search'
        })
        .when(Routes.Popular, {
            templateUrl: 'sections/popular/popular.tpl.html',
            controller: 'PopularController as popular',
            resolve: {
                shows: ['ShowService', (ShowService: IShowService) => {
                    return ShowService.getPopular();
                }]
            }
        })
        .when(Routes.View, {
            templateUrl: 'sections/view/view.tpl.html',
            controller: 'ViewController as view',
            resolve: {
                show: ['ShowService', '$route', (ShowService: IShowService, $route: any) => {
                    return ShowService.get($route.current.params.id);
                }]
            }
        })
        .otherwise({
            redirectTo: Routes.Home
        });
}