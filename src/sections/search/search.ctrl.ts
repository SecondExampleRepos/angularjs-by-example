'use strict';
import { ILocationService, IRouteParamsService } from 'angular';
import { ShowService, PageValues } from './services';
enum PageTitles {
    SEARCH = "SEARCH"
}
enum PageDescriptions {
    SEARCH = "Search for your favorite TV shows."
}
interface IShowService {
    search(query: string): Promise<any>;
}
interface IPageValues {
    title: string;
    description: string;
}
interface ISearchController {
    query: string | null;
    shows: any[];
    loading: boolean | null;
    setSearch(): void;
    performSearch(query: string): void;
}
class SearchController implements ISearchController {
    query: string | null = null;
    shows: any[] = [];
    loading: boolean | null = null;
    static $inject = ['$location', '$routeParams', 'ShowService', 'PageValues'];
    constructor(
        private $location: ILocationService,
        private $routeParams: IRouteParamsService,
        private showService: IShowService,
        private pageValues: IPageValues
    ) {
        this.pageValues.title = PageTitles.SEARCH;
        this.pageValues.description = PageDescriptions.SEARCH;
        if (typeof this.$routeParams.query !== "undefined") {
            this.performSearch(this.$routeParams.query);
            this.query = decodeURI(this.$routeParams.query);
        }
    }
    setSearch(): void {
        const query = encodeURI(this.query as string);
        this.$location.path('/search/' + query);
    }
    performSearch(query: string): void {
        this.loading = true;
        this.showService.search(query).then((response: any) => {
            this.shows = response;
            this.loading = false;
        });
    }
}
angular
    .module('app.core')
    .controller('SearchController', SearchController);