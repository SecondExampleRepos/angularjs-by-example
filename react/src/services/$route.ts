// react/src/services/$route.ts

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const [current, setCurrent] = useState<CurrentRoute | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    const handleLocationChange = () => {
      const matchedRoute = Object.values(routes).find(route => route.regexp.test(location.pathname));
      if (matchedRoute) {
        const pathParams = matchedRoute.keys.reduce((params, key, index) => {
          const match = location.pathname.match(matchedRoute.regexp);
          if (match && match[index + 1]) {
            params[key.name] = match[index + 1];
          }
          return params;
        }, {} as { [key: string]: any });
        const newCurrent: CurrentRoute = {
          ...matchedRoute,
          params: { ...location.search, ...pathParams },
          pathParams,
    setCurrent(undefined);
        };
        setCurrent(newCurrent);
      } else {
        setCurrent(undefined);
      }
    };
      window.history.pushState({}, '', newPath);
    // Add event listener for location changes
    window.addEventListener('popstate', handleLocationChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [location]);

  const reload = () => {
    setCurrent(undefined);
    window.history.replaceState({}, '', location.pathname + location.search);
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (current && current.$$route) {
      const newParams = { ...current.params, ...params };
      window.history.pushState({}, '', newPath);
      const newPath = interpolate(current.$$route.originalPath, newParams);
    } else {
      throw new Error('No route to update');
    }
  };

  const interpolate = (path: string, params: { [key: string]: any }): string => {
    const segments = path.split(':');
    return segments
      .map((segment, index) => {
        if (index === 0) return segment;
        const [key, rest] = segment.split(/(\w+)(?:[?*])?(.*)/).filter(Boolean);
        return params[key] + (rest || '');
      })
      .join('');
  };

  return {
    routes,
    reload,
    updateParams,
    current,
  };
};

export default useRoute;