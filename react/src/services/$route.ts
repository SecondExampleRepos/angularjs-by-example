// react/src/services/$route.ts

import { useState, useEffect } from 'react';
import { useRootScope } from '../hooks/useRootScope';
import { useLocation } from 'react-router-dom';
import { $q } from '../utils/constants/q';
import { $templateRequest } from '../utils/constants/templateRequest';
import { $sce } from '../utils/constants/sce';

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
  params?: { [key: string]: any };
  pathParams?: { [key: string]: any };
  $$route?: Route;
}

interface RouteService {
  routes: { [path: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

const useRoute = (): RouteService => {
  const { state: rootScope, setState: setRootScope } = useRootScope();
  const location = useLocation();
  const [routes, setRoutes] = useState<{ [path: string]: Route }>({});
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [previousRoute, setPreviousRoute] = useState<Route | null>(null);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const handleLocationChangeStart = () => {
      const nextRoute = getCurrentRoute();
      if (nextRoute && currentRoute && nextRoute.$$route === currentRoute.$$route && !reloadFlag) {
        rootScope.$broadcast('$routeChangeStart', nextRoute, currentRoute);
      }
    };

    const handleLocationChangeSuccess = () => {
      const nextRoute = getCurrentRoute();
      if (nextRoute) {
        setPreviousRoute(currentRoute);
        setCurrentRoute(nextRoute);
        if (nextRoute.locals) {
              const resolvePromises = Object.keys(nextRoute.locals).map(key => {
                const value = nextRoute.locals[key];
                return typeof value === 'function' ? value() : value;
              });

              $q.all(resolvePromises).then(resolvedLocals => {
                const locals = Object.keys(nextRoute.locals).reduce((acc, key, index) => {
                  acc[key] = resolvedLocals[index];
                  return acc;
                }, {});

                setCurrentRoute({ ...nextRoute, locals });
                rootScope.$broadcast('$routeChangeSuccess', nextRoute, previousRoute);
              }).catch(error => {
                rootScope.$broadcast('$routeChangeError', nextRoute, previousRoute, error);
              });
            } else {
              rootScope.$broadcast('$routeChangeSuccess', nextRoute, previousRoute);
            }
      }
    };

    // Add event listeners for location changes
    window.addEventListener('popstate', handleLocationChangeStart);
    window.addEventListener('popstate', handleLocationChangeSuccess);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('popstate', handleLocationChangeStart);
      window.removeEventListener('popstate', handleLocationChangeSuccess);
    };
  }, [currentRoute, reloadFlag]);
    setRootScope((prevState) => ({ ...prevState, reloadFlag: true }));
  const getCurrentRoute = (): Route | null => {
    const path = location.pathname;
    for (const routePath in routes) {
      const route = routes[routePath];
      const match = route.regexp.exec(path);
      if (match) {
        const params: { [key: string]: any } = {};
        route.keys.forEach((key, index) => {
      window.history.pushState({}, '', `${newPath}?${new URLSearchParams(newParams).toString()}`);
        });
        return { ...route, params, pathParams: params };
      }
    }
    return null;
  };

  const reload = () => {
    setReloadFlag(true);
    setRootScope((prevState) => ({ ...prevState, reloadFlag: true }));
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (currentRoute && currentRoute.$$route) {
      const newParams = { ...currentRoute.params, ...params };
      const newPath = currentRoute.$$route.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      location.pathname = newPath;
      location.search = new URLSearchParams(newParams).toString();
      window.history.pushState({}, '', `${newPath}?${new URLSearchParams(newParams).toString()}`);
    } else {
      throw new Error('No route to update');
    }
  };

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRoute;