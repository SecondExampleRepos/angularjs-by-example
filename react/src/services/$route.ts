import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

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
  controller?: any;
  controllerAs?: string;
  locals?: { [key: string]: any };
  loadedTemplateUrl?: string;
}

interface CurrentRoute extends Route {
  params: { [key: string]: any };
  pathParams: { [key: string]: any };
  $$route: Route;
}

interface RouteService {
  routes: { [key: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
  current?: CurrentRoute;
}

const useRouteService = (): RouteService => {
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const [current, setCurrent] = useState<CurrentRoute | undefined>(undefined);
  const history = useHistory();
  const location = useLocation();

  const reload = () => {

    const currentPath = location.pathname;
    const currentRoute = Object.values(routes).find(route => route.regexp.test(currentPath));

    if (currentRoute) {
      const pathParams = currentPath.match(currentRoute.regexp)?.groups || {};
      const searchParams = Object.fromEntries(new URLSearchParams(location.search).entries());

      const newCurrent: CurrentRoute = {
        ...currentRoute,
        params: { ...searchParams, ...pathParams },
        pathParams,
        $$route: currentRoute,
      };

      setCurrent(newCurrent);
    } else {
      setCurrent(undefined);
    }
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (current && current.$$route) {
      const newParams = { ...current.params, ...params };
      const path = buildPath(current.$$route.originalPath, newParams);
      history.push({ pathname: path, search: new URLSearchParams(newParams).toString() });

      const path = location.pathname;
      const searchParams = new URLSearchParams(location.search);
      let matchedRoute: CurrentRoute | undefined;

      Object.keys(routes).forEach((routePath) => {
        const route = routes[routePath];
        const match = route.regexp.exec(path);
        if (match) {
          const params: { [key: string]: any } = {};
          route.keys.forEach((key, index) => {
            params[key.name] = match[index + 1];
          });

          matchedRoute = {
            ...route,
            params: { ...Object.fromEntries(searchParams.entries()), ...params },
            pathParams: params,
            $$route: route,
          };
        }
      });

      if (matchedRoute) {
        setCurrent(matchedRoute);
      } else {
        setCurrent(undefined);
      }
    };
      throw new Error('No route to update');
    }
  };

  const buildPath = (path: string, params: { [key: string]: any }): string => {
    const segments = path.split(':');
    return segments
      .map((segment, index) => {
        if (index === 0) return segment;
        const [key, rest] = segment.match(/(\w+)(.*)/)!.slice(1);
        return params[key] + rest;
      })
      .join('');
  };

  useEffect(() => {
    const handleLocationChange = () => {

      const currentPath = location.pathname;
      const currentRoute = Object.values(routes).find(route => route.regexp.test(currentPath));

      if (currentRoute) {
        const pathParams = currentPath.match(currentRoute.regexp)?.groups || {};
        const searchParams = Object.fromEntries(new URLSearchParams(location.search).entries());

        const newCurrent: CurrentRoute = {
          ...currentRoute,
          params: { ...searchParams, ...pathParams },
          pathParams,
          $$route: currentRoute,
        };

        setCurrent(newCurrent);
      } else {
        setCurrent(undefined);
      }
    };

    handleLocationChange();
    history.listen(handleLocationChange);

    return () => {
      // Cleanup listener on unmount
    };
  }, [history]);

  return {
    routes,
    reload,
    updateParams,
    current,
  };
};

export default useRouteService;
