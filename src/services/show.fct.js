'use strict';

/*
 * Contains a service to communicate with the TRACK TV API
 */
import angular from 'angular';
import type { Show, Cast, SearchResult } from './show.fct-js.types';
import moment from 'moment';

angular
    .module('app.services')
    .constant('API_KEY', '87de9079e74c828116acce677f6f255b')
    .constant('BASE_URL', 'http://api.themoviedb.org/3')
    .factory('ShowService', dataService);

interface DataService {
    getPremieres: () => Promise<Show[]>;
    get: (id: string) => Promise<Show>;
    search: (query: string) => Promise<SearchResult[]>;
    getPopular: () => Promise<SearchResult[]>;
    getCast: (id: string) => Promise<Cast>;
}

function dataService($http: ng.IHttpService, API_KEY: string, BASE_URL: string, $log: ng.ILogService, moment: any): DataService {
    const data: DataService = {
        getPremieres,
        get,
        search,
        getPopular,
        getCast
    };

    function makeRequest<T>(url: string, params: Record<string, string>): Promise<T> {
        let requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
        angular.forEach(params, (value, key) => {
            requestUrl = `${requestUrl}&${key}=${value}`;
        });
        return $http({
            url: requestUrl,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: true
        }).then((response: ng.IHttpResponse<T>) => {
            return response.data;
        }).catch(dataServiceError);
    }

    function getPremieres(): Promise<Show[]> {
        // Get first day of the current month
        const date = new Date();
        date.setDate(1);
        return makeRequest<{ results: Show[] }>('discover/tv', { 'first_air_date.gte': moment(date).format('DD-MM-YYYY'), append_to_response: 'genres' })
            .then(data => data.results);
    }

    function get(id: string): Promise<Show> {
        return makeRequest<Show>(`tv/${id}`, {});
    }

    function getCast(id: string): Promise<Cast> {
        return makeRequest<Cast>(`tv/${id}/credits`, {});
    }

    function search(query: string): Promise<SearchResult[]> {
        return makeRequest<{ results: SearchResult[] }>('search/tv', { query })
            .then(data => data.results);
    }

    function getPopular(): Promise<SearchResult[]> {
        return makeRequest<{ results: SearchResult[] }>('tv/popular', {})
            .then(data => data.results);
    }

    function dataServiceError(errorResponse: any): any {
        $log.error('XHR Failed for ShowService');
        $log.error(errorResponse);
        return errorResponse;
    }

    return data;
}
