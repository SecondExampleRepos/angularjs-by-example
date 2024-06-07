'use strict';

/*
 * Contains a service to communicate with the TRACK TV API
 */
angular
    .module('app.services')
    .constant('API_KEY', '87de9079e74c828116acce677f6f255b')
    .constant('BASE_URL', 'http://api.themoviedb.org/3')
    .factory('ShowService', dataService);

interface IShowService {
    getPremieres(): Promise<any>;
    get(id: number): Promise<any>;
    search(query: string): Promise<any>;
    getPopular(): Promise<any>;
    getCast(id: number): Promise<any>;
}

function dataService($http: ng.IHttpService, API_KEY: string, BASE_URL: string, $log: ng.ILogService, moment: any): IShowService {
    const data: IShowService = {
        getPremieres: getPremieres,
        get: get,
        search: search,
        getPopular: getPopular,
        getCast: getCast
    };

    function makeRequest(url: string, params: { [key: string]: any }): Promise<any> {
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
        }).then((response: ng.IHttpResponse<any>) => {
            return response.data;
        }).catch(dataServiceError);
    }

    function getPremieres(): Promise<any> {
        // Get first day of the current month
        const date = new Date();
        date.setDate(1);
        return makeRequest('discover/tv', { 'first_air_date.gte': moment(date).format('DD-MM-YYYY'), append_to_response: 'genres' }).then((data: any) => {
            return data.results;
        });
    }

    function get(id: number): Promise<any> {
        return makeRequest(`tv/${id}`, {});
    }

    function getCast(id: number): Promise<any> {
        return makeRequest(`tv/${id}/credits`, {});
    }

    function search(query: string): Promise<any> {
        return makeRequest('search/tv', { query: query }).then((data: any) => {
            return data.results;
        });
    }

    function getPopular(): Promise<any> {
        return makeRequest('tv/popular', {}).then((data: any) => {
            return data.results;
        });
    }

    function dataServiceError(errorResponse: any): any {
        $log.error('XHR Failed for ShowService');
        $log.error(errorResponse);
        return errorResponse;
    }

    return data;
}