'use strict';
import angular from 'angular';
import { ILocationService, IRouteParamsService } from 'angular';

interface IPageValues {
    title: string;
    description: string;
}

interface IShow {
    original_name: string;
    id: number;
    cast: ICastMember[];
}

interface ICastMember {
    name: string;
    character: string;
}

interface IShowService {
    getCast(showId: number): ng.IPromise<{ cast: ICastMember[] }>;
}

class ViewController {
    static $inject = ['$scope', '$location', 'PageValues', 'show', 'ShowService', '$routeParams'];

    constructor(
        private $scope: ng.IScope,
        private $location: ILocationService,
        private PageValues: IPageValues,
        private show: IShow,
        private ShowService: IShowService,
        private $routeParams: IRouteParamsService
    ) {
        this.init();
    }

    private init(): void {
        // Set page title and description
        this.PageValues.title = "VIEW";
        this.PageValues.description = `Overview, seasons & info for '${this.show.original_name}'.`;

        // Setup view model object
        this.show.cast = [];
        this.ShowService.getCast(this.show.id).then((response) => {
            this.show.cast = response.cast;
        });
    }

    public setBannerImage(): { [key: string]: string } {
        return {
            'background': 'url() no-repeat',
            'background-size': '100%',
            'background-position': '100% 0%'
        };
    }
}

angular
    .module('app.core')
    .controller('ViewController', ViewController);