'use strict';
import * as angular from 'angular';
import { IHttpProvider, IHttpResponse, IQService, ILocationService, ILogService, IRootScopeService } from 'angular';
enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}
interface IPageValues {
    loading: boolean;
}
angular
    .module('app.config', [])
    .config(configs)
    .run(runs);
function configs($httpProvider: IHttpProvider) {
    const interceptor = ($location: ILocationService, $log: ILogService, $q: IQService) => {
        function error(response: IHttpResponse<any>) {
            if (response.status === HttpStatus.Unauthorized) {
                $log.error('You are unauthorised to access the requested resource (401)');
            } else if (response.status === HttpStatus.NotFound) {
                $log.error('The requested resource could not be found (404)');
            } else if (response.status === HttpStatus.InternalServerError) {
                $log.error('Internal server error (500)');
            }
            return $q.reject(response);
        }
        function success(response: IHttpResponse<any>) {
            //Request completed successfully
            return response;
        }
        return function(promise: ng.IPromise<any>) {
            return promise.then(success, error);
        }
    };
    $httpProvider.interceptors.push(interceptor);
}
function runs($rootScope: IRootScopeService, PageValues: IPageValues) {
    $rootScope.$on('$routeChangeStart', function() {
        PageValues.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
        PageValues.loading = false;
    });
}