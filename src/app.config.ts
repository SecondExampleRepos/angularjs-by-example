'use strict';
import angular from 'angular';
import { IHttpProvider, ILocationService, ILogService, IQService, IRootScopeService } from 'angular';

module 'app.config' {
    .config(configs)
    .run(runs);

function configs($httpProvider: IHttpProvider) {
    const interceptor = function($location: ILocationService, $log: ILogService, $q: IQService) {
        function error(response: { status: number }) {
            if (response.status === 401) {
                $log.error('You are unauthorised to access the requested resource (401)');
            } else if (response.status === 404) {
                $log.error('The requested resource could not be found (404)');
            } else if (response.status === 500) {
                $log.error('Internal server error (500)');
            }
            return $q.reject(response);
        }
        function success(response: any) {
            //Request completed successfully
            return response;
        }
        return function(promise: Promise<any>) {
            return promise.then(success, error);
        }
    };
    $httpProvider.interceptors.push(interceptor);
}

function runs($rootScope: IRootScopeService, PageValues: { loading: boolean }) {
    $rootScope.$on('$routeChangeStart', function() {
        PageValues.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
        PageValues.loading = false;
    });
}
