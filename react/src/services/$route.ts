// react/src/services/$route.ts

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
}

interface RouteChangeEvent {
  current: Route | null;
  previous: Route | null;
}

interface RouteService {
  routes: { [path: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
  onRouteChangeStart: (callback: (event: RouteChangeEvent) => void) => void;
  onRouteChangeSuccess: (callback: (event: RouteChangeEvent) => void) => void;
  onRouteChangeError: (callback: (event: RouteChangeEvent) => void) => void;
}

const createRouteService = (): RouteService => {
  const routes: { [path: string]: Route } = {};
  const routeChangeStart$ = new Subject<RouteChangeEvent>();
  const routeChangeSuccess$ = new Subject<RouteChangeEvent>();
  const routeChangeError$ = new Subject<RouteChangeEvent>();

  const addRoute = (path: string, route: Route) => {
    routes[path] = route;
  };

  const reload = () => {
    const currentRoute = routes[location.pathname];
    if (currentRoute) {
      const event: RouteChangeEvent = {
        current: currentRoute,
    if (routeService.current && routeService.current.$$route) {
      const newParams = { ...routeService.current.params, ...params };
      const path = routeService.current.$$route.originalPath;
      const searchParams = new URLSearchParams(location.search);
      
      Object.keys(params).forEach(key => {
        if (routeService.current.pathParams[key]) {
          searchParams.set(key, params[key]);
        }
      });
      
      location.pathname = path;
      location.search = searchParams.toString();
    } else {
      throw new Error("No current route to update parameters for.");
    }
      };
      routeChangeStart$.next(event);
      // Simulate route resolution and template loading
      Promise.resolve(currentRoute.resolve || {})
        .then((resolvedData) => {
          currentRoute.resolve = resolvedData;
          routeChangeSuccess$.next(event);
        })
        .catch((error) => {
          routeChangeError$.next({ ...event, error });
        });
    }
  };

  const updateParams = (params: { [key: string]: any }) => {
      const currentRoute = Object.values(routeService.routes).find(route => route.regexp.test(location.pathname));
      if (currentRoute) {
        const previousRoute = routeService.routes[routeService.current?.originalPath || ''];
        routeService.current = currentRoute;
    window.addEventListener('popstate', handleLocationChange);
        // Simulate resolving route
        Promise.resolve(currentRoute.resolve || {}).then(resolvedData => {
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
          routeService.routeChangeSuccess$.next({ current: currentRoute, previous: previousRoute });
        }).catch(error => {
          routeService.routeChangeError$.next({ current: currentRoute, previous: previousRoute });
        });
      }
  };

  const onRouteChangeStart = (callback: (event: RouteChangeEvent) => void) => {
    routeChangeStart$.subscribe(callback);
  };

  const onRouteChangeSuccess = (callback: (event: RouteChangeEvent) => void) => {
    routeChangeSuccess$.subscribe(callback);
  };

  const onRouteChangeError = (callback: (event: RouteChangeEvent) => void) => {
    routeChangeError$.subscribe(callback);
  };

  return {
    routes,
    reload,
    updateParams,
    onRouteChangeStart,
    onRouteChangeSuccess,
    onRouteChangeError,
  };
};

const useRouteService = () => {
  const [routeService] = useState(createRouteService);
  const location = useLocation();

  useEffect(() => {
    const handleLocationChange = () => {
      const currentRoute = Object.values(routeService.routes).find(route => route.regexp.test(location.pathname));
      if (currentRoute) {
        const previousRoute = routeService.routes[routeService.current?.originalPath || ''];
        routeService.current = currentRoute;
window.addEventListener('popstate', handleLocationChange);
      }
    };
      window.removeEventListener('popstate', handleLocationChange);
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);

    return () => {
    window.addEventListener('popstate', handleLocationChange);
    };
  }, [location]);

  return routeService;
};

export default useRouteService;