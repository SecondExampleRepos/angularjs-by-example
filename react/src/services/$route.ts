// react/src/services/$route.ts

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

const useRoute = (): RouteService => {
  const [current, setCurrent] = useState<CurrentRoute | undefined>(undefined);
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const history = useHistory();
  const location = useLocation();

  const reload = () => {

    if (current) {
      const newParams = { ...current.params };
      const newPath = interpolate(current.$$route.originalPath, newParams);
      history.push(newPath);
    } else {
      throw new Error('No route to reload');
    }
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (current && current.$$route) {
      const newParams = { ...current.params, ...params };
      const newPath = interpolate(current.$$route.originalPath, newParams);
      history.push(newPath);
    } else {
      throw new Error('No route to update');
    }
  };

  const interpolate = (path: string, params: { [key: string]: any }) => {
    const segments = path.split(':');
    return segments
      .map((segment, index) => {
        if (index === 0) return segment;
        const [key, rest] = segment.match(/(\w+)(.*)/)!.slice(1);

      const path = location.pathname;
      const search = location.search;
      let matchedRoute: Route | undefined;
      let pathParams: { [key: string]: any } = {};

      // Find the matching route
      for (const routePath in routes) {
        const route = routes[routePath];
        const match = route.regexp.exec(path);
        if (match) {
          matchedRoute = route;
          route.keys.forEach((key, index) => {
            pathParams[key.name] = match[index + 1];
          });
          break;
        }
      }

      if (matchedRoute) {
        const currentRoute: CurrentRoute = {
          ...matchedRoute,
          params: { ...pathParams, ...Object.fromEntries(new URLSearchParams(search)) },
          pathParams,
          $$route: matchedRoute,
        };
        setCurrent(currentRoute);
      } else {
        setCurrent(undefined);
      }
    };
      .join('');
  };

  useEffect(() => {
    const handleLocationChange = () => {

      const path = location.pathname;
      const search = location.search;
      let matchedRoute: Route | undefined;
      let pathParams: { [key: string]: any } = {};

      // Find the matching route
      for (const routePath in routes) {
        const route = routes[routePath];
        const match = route.regexp.exec(path);
        if (match) {
          matchedRoute = route;
          route.keys.forEach((key, index) => {
            pathParams[key.name] = match[index + 1];
          });
          break;
        }
      }

      if (matchedRoute) {
        const currentRoute: CurrentRoute = {
          ...matchedRoute,
          params: { ...pathParams, ...Object.fromEntries(new URLSearchParams(search)) },
          pathParams,
          $$route: matchedRoute,
        };
        setCurrent(currentRoute);
      } else {
        setCurrent(undefined);
      }
    };

    handleLocationChange();
    history.listen(handleLocationChange);

    return () => {
      // Cleanup listener
    };
  }, [history]);

  return {
    routes,
    reload,
    updateParams,
    current,
  };
};

export default useRoute;
