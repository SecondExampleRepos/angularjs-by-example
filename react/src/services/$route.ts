import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomEvent } from '../utils/constants/events'; // Assuming you have a constants file for events

interface Route {
  originalPath: string;
  regexp: RegExp;
  keys: Array<{ name: string; optional: boolean }>;
  caseInsensitiveMatch?: boolean;
  reloadOnSearch?: boolean;
  redirectTo?: string | ((params: any, path: string, search: string) => string);
  resolve?: { [key: string]: any };
  template?: string | ((params: any) => string);
  templateUrl?: string | ((params: any) => string);
  controller?: string | ((scope: any, locals: any) => any);
  controllerAs?: string;
  locals?: { [key: string]: any };
  loadedTemplateUrl?: string;
}

interface RouteService {
  routes: { [key: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

const useRoute = (): RouteService => {
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const location = useLocation();

  const reload = () => {
    const reload = () => {
        // Trigger a custom event to notify listeners about the reload
        const reloadEvent = new CustomEvent('routeReload');
        window.dispatchEvent(reloadEvent);
const currentRoute = routes[location.pathname];
if (currentRoute && currentRoute.$$route) {
  const newParams = { ...currentRoute.params, ...params };
  const newPath = currentRoute.$$route.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
  const newSearch = { ...location.search, ...params };
      const currentRoute = routes[location.pathname];
           if (currentRoute) {
             const params = new URLSearchParams(location.search);
             const pathParams: { [key: string]: string } = {};
// Update the current route based on the new location
const currentPath = location.pathname;
const currentRoute = Object.values(routes).find(route => route.regexp.test(currentPath));

if (currentRoute) {
  const pathParams = currentPath.match(currentRoute.regexp)?.groups || {};
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));

  const newRoute = {
    ...currentRoute,
    params: { ...searchParams, ...pathParams },
    pathParams,
  };

  setRoutes(prevRoutes => ({
    ...prevRoutes,
    [currentRoute.originalPath]: newRoute,
  }));

  // Broadcast route change success event
  const event = new CustomEvent('routeChangeSuccess', { detail: newRoute });
  window.dispatchEvent(event);
}
               pathParams[key.name] = params.get(key.name) || '';
             });
             const newRoute = {
               ...currentRoute,
               params: { ...params },
               pathParams,
             };
             setRoutes((prevRoutes) => ({
               ...prevRoutes,
               [location.pathname]: newRoute,
             }));
           }
  // Update the location with new path and search params
  window.history.pushState({}, '', `${newPath}?${new URLSearchParams(newSearch).toString()}`);
} else {
  console.error('No current route to update params for.');
}
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (routes[location.pathname]) {
      const currentRoute = routes[location.pathname];
      const newParams = { ...currentRoute.params, ...params };
      const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      const newSearch = { ...Object.fromEntries(new URLSearchParams(location.search)), ...params };
// Trigger a custom event to notify listeners about the start of a location change
const locationChangeStartEvent = new CustomEvent('locationChangeStart', { detail: location });
window.dispatchEvent(locationChangeStartEvent);
      // Update the location with new path and search params
      const currentPath = location.pathname;
      const currentRoute = Object.values(routes).find(route => route.regexp.test(currentPath));

      if (currentRoute) {
        const pathParams = currentPath.match(currentRoute.regexp)?.groups || {};
        const searchParams = Object.fromEntries(new URLSearchParams(location.search));

        const newRoute = {
          ...currentRoute,
          params: { ...searchParams, ...pathParams },
          pathParams,
        };

        setRoutes(prevRoutes => ({
          ...prevRoutes,
          [currentRoute.originalPath]: newRoute,
        }));

        // Broadcast route change success event
        const event = new CustomEvent('routeChangeSuccess', { detail: newRoute });
        window.dispatchEvent(event);
      } else {
        console.error('No matching route found for the current path.');
      }
      
      // Update the route with new params
      const updatedRoute = {
        ...currentRoute,
        params: newParams,
        pathParams: newParams,
      };
      
      setRoutes(prevRoutes => ({
        ...prevRoutes,
        [location.pathname]: updatedRoute,
      }));
      
      // Broadcast route change success event
      const event = new CustomEvent('routeChangeSuccess', { detail: updatedRoute });
      window.dispatchEvent(event);
    } else {
      console.error('No current route to update params for.');
    }
  };

  useEffect(() => {
    const handleLocationChangeStart = () => {
      const currentPath = location.pathname;
      const currentRoute = Object.values(routes).find(route => route.regexp.test(currentPath));

      if (currentRoute) {
      const currentPath = location.pathname;
      const currentRoute = Object.values(routes).find(route => route.regexp.test(currentPath));

      if (currentRoute) {
        const pathParams = currentPath.match(currentRoute.regexp)?.groups || {};
        const searchParams = Object.fromEntries(new URLSearchParams(location.search));

        const newRoute = {
          ...currentRoute,
          params: { ...searchParams, ...pathParams },
          pathParams,
        };

        setRoutes(prevRoutes => ({
          ...prevRoutes,
          [currentRoute.originalPath]: newRoute,
        }));

        // Broadcast route change success event
        const event = new CustomEvent('routeChangeSuccess', { detail: newRoute });
        window.dispatchEvent(event);
      } else {
        console.error('No matching route found for the current path.');
      }
        const searchParams = Object.fromEntries(new URLSearchParams(location.search));

        const newRoute = {
          ...currentRoute,
          params: { ...searchParams, ...pathParams },
          pathParams,
        };

        setRoutes(prevRoutes => ({
          ...prevRoutes,
          [currentRoute.originalPath]: newRoute,
        }));

        // Broadcast route change success event
        const event = new CustomEvent('routeChangeSuccess', { detail: newRoute });
        window.dispatchEvent(event);
      } else {
        console.error('No matching route found for the current path.');
      }
    };

    const handleLocationChangeSuccess = () => {
      const currentPath = location.pathname;
      const currentRoute = Object.values(routes).find(route => route.regexp.test(currentPath));

      if (currentRoute) {
        const pathParams = currentPath.match(currentRoute.regexp)?.groups || {};
        const searchParams = Object.fromEntries(new URLSearchParams(location.search));

        const newRoute = {
          ...currentRoute,
          params: { ...searchParams, ...pathParams },
          pathParams,
        };

        setRoutes(prevRoutes => ({
          ...prevRoutes,
          [currentRoute.originalPath]: newRoute,
        }));

        // Broadcast route change success event
        const event = new CustomEvent('routeChangeSuccess', { detail: newRoute });
        window.dispatchEvent(event);
      } else {
        console.error('No matching route found for the current path.');
      }
    };

    window.addEventListener('locationChangeStart', handleLocationChangeStart);
    window.addEventListener('locationChangeSuccess', handleLocationChangeSuccess);

    return () => {
      window.removeEventListener('locationChangeStart', handleLocationChangeStart);
      window.removeEventListener('locationChangeSuccess', handleLocationChangeSuccess);
    };
  }, [location]);

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRoute;