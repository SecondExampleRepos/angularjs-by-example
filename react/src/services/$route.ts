import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTemplate, fetchController } from '../utils/fetchHelpers';

interface Route {
    originalPath: string;
    regexp: RegExp;
    keys: Array<{ name: string; optional: boolean }>;
    caseInsensitiveMatch?: boolean;
    reloadOnSearch?: boolean;
    redirectTo?: string | ((params: any, path: string, search: any) => string);
    resolve?: { [key: string]: any };
    template?: string | ((params: any) => string);
    templateUrl?: string | ((params: any) => string);
    controller?: string | ((params: any) => any);
    controllerAs?: string;
    locals?: { [key: string]: any };
    params?: { [key: string]: any };
    pathParams?: { [key: string]: any };
}

interface RouteService {
    routes: { [key: string]: Route };
    reload: () => void;
    updateParams: (params: { [key: string]: any }) => void;
}

const useRoute = (): RouteService => {
    const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

    useEffect(() => {
        const matchRoute = () => {
            const path = location.pathname;
            let matchedRoute: Route | null = null;

            Object.keys(routes).forEach((routePath) => {
                const route = routes[routePath];
                const match = route.regexp.exec(path);
                if (match) {
                    const params: { [key: string]: any } = {};
                    route.keys.forEach((key, index) => {
                        params[key.name] = match[index + 1];
                    });
                    matchedRoute = { ...route, params, pathParams: params };
                }
            });

            setCurrentRoute(matchedRoute);
        };

        matchRoute();
    }, [location, routes]);

    const reload = () => {

        // Trigger a re-evaluation of the current route
        const matchRoute = () => {
            const path = location.pathname;
            let matchedRoute: Route | null = null;

            Object.keys(routes).forEach((routePath) => {

            const newSearchParams = new URLSearchParams(location.search);

            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined) {
                    newSearchParams.set(key, params[key]);
                } else {
                    newSearchParams.delete(key);
                }
            });

            const newUrl = `${newPath}?${newSearchParams.toString()}`;
            window.history.pushState({}, '', newUrl);
                const match = route.regexp.exec(path);
                if (match) {
                    const params: { [key: string]: any } = {};
                    route.keys.forEach((key, index) => {
                        params[key.name] = match[index + 1];
                    });
                    matchedRoute = { ...route, params, pathParams: params };
                }
            });

            setCurrentRoute(matchedRoute);
        };

        matchRoute();
    };

    const updateParams = (params: { [key: string]: any }) => {
        if (currentRoute) {
            const newParams = { ...currentRoute.params, ...params };
            const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');

            const newSearchParams = new URLSearchParams(location.search);

            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined) {
                    newSearchParams.set(key, params[key]);
                } else {
                    newSearchParams.delete(key);
                }
            });

            const newUrl = `${newPath}?${newSearchParams.toString()}`;
            window.history.pushState({}, '', newUrl);
            setCurrentRoute({ ...currentRoute, params: newParams });
        }
    };

    return {
        routes,
        reload,
        updateParams,
    };
};

export default useRoute;