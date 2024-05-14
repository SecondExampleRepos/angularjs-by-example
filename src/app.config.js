'use strict';
import angular from 'angular';
import { IHttpProvider, ILocationService, ILogService, IQService, IRootScopeService } from 'angular';

module 'app.config' {
    .config(configs)
    .run(runs);
}

type InterceptorFunction = (promise: Promise<any>) => Promise<any>;

function configs($httpProvider: IHttpProvider): void {
    const interceptor = function($location: ILocationService, $log: ILogService, $q: IQService): InterceptorFunction {
        function error(response: { status: number }): Promise<any> {
            if (response.status === 401) {
                $log.error('You are unauthorised to access the requested resource (401)');
            } else if (response.status === 404) {
                $log.error('The requested resource could not be found (404)');
            } else if (response.status === 500) {
                $log.error('Internal server error (500)');
            }
            return $q.reject(response);
        }
        function success(response: any): any {
            // Request completed successfully
            return response;
        }
        return function(promise: Promise<any>): Promise<any> {
            return promise.then(success, error);
        }
    };
    $httpProvider.interceptors.push(interceptor);
}

interface PageValuesType {
    loading: boolean;
}

function runs($rootScope: IRootScopeService, PageValues: PageValuesType): void {
    $rootScope.$on('$routeChangeStart', function() {
        PageValues.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
        PageValues.loading = false;
    });
}