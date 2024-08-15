// Derived from src/app.config.js

export type InterceptorFunction = (promise: ng.IPromise<any>) => ng.IPromise<any>;

export interface Interceptor {
    (location: ng.ILocationService, log: ng.ILogService, q: ng.IQService): InterceptorFunction;
}

export interface ConfigsFunction {
    ($httpProvider: ng.IHttpProvider): void;
}

export interface RunsFunction {
    ($rootScope: ng.IRootScopeService, PageValues: PageValues): void;
}

export interface PageValues {
    loading: boolean;
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}
