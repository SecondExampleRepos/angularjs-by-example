// Derived from src/app.routes.js

export type RouteConfig = {
    templateUrl: string;
    controller: string;
    resolve?: ResolveConfig;
};

export type ResolveConfig = {
    [key: string]: (...args: any[]) => Promise<any>;
};

export type RouteParams = {
    id?: string;
    query?: string;
};

export type ShowService = {
    getPremieres: () => Promise<any>;
    getPopular: () => Promise<any>;
    get: (id: string) => Promise<any>;
};

export type RouteProvider = {
    when: (path: string, route: RouteConfig) => RouteProvider;
    otherwise: (params: { redirectTo: string }) => void;
};

export function config($routeProvider: RouteProvider): void {
    // Function implementation is not required in the type definition file
}
