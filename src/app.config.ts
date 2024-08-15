'use strict';

import type { IHttpProvider, IHttpPromiseCallbackArg, ILocationService, ILogService, IQService, IRootScopeService } from 'angular';
import type { PageValuesType } from './app.config-js.types';

angular
    .module('app.config', [])
    .config(configs)
    .run(runs);

function configs($httpProvider: IHttpProvider): void {
    const interceptor = ($location: ILocationService, $log: ILogService, $q: IQService) => {
        function error(response: IHttpPromiseCallbackArg<any>): angular.IPromise<any> {
            if (response.status === 401) {
                $log.error('You are unauthorised to access the requested resource (401)');
            } else if (response.status === 404) {
                $log.error('The requested resource could not be found (404)');
            } else if (response.status === 500) {
                $log.error('Internal server error (500)');
            }
            return $q.reject(response);
        }

        function success(response: IHttpPromiseCallbackArg<any>): IHttpPromiseCallbackArg<any> {
            // Request completed successfully
            return response;
        }

        return (promise: angular.IPromise<any>): angular.IPromise<any> => {
            return promise.then(success, error);
        };
    };

    $httpProvider.interceptors.push(interceptor);
}

function runs($rootScope: IRootScopeService, PageValues: PageValuesType): void {
    $rootScope.$on('$routeChangeStart', () => {
        PageValues.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', () => {
        PageValues.loading = false;
    });
}
