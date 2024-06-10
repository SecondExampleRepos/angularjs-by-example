// react/src/services/$route.ts

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchInitialData, setupSubscription } from '../utils/dataUtils'; // Adjust the import paths as necessary

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

interface RouteService {
  routes: { [key: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

const useRoute = (): RouteService => {
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const location = useLocation();

  useEffect(() => {
    // Placeholder for any initialization logic
    fetchInitialData();
    const subscription = setupSubscription();

    return () => {
      // Placeholder for any cleanup logic
      subscription.unsubscribe();
    };
  }, []);

  const reload = () => {
    // Placeholder for reload logic
    setRoutes((prevRoutes) => {
          const newRoutes = { ...prevRoutes };
          Object.keys(newRoutes).forEach((key) => {
            if (newRoutes[key].reloadOnSearch) {
              newRoutes[key] = {
    if (routes.current && routes.current.$$route) {
      const newParams = { ...routes.current.params, ...params };
      const path = routes.current.$$route.originalPath;
      const newPath = path.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      const searchParams = new URLSearchParams(location.search);
      Object.keys(params).forEach(key => {
        if (!routes.current.pathParams[key]) {
          searchParams.set(key, params[key]);
        }
      });
      window.history.pushState({}, '', `${newPath}?${searchParams.toString()}`);
    } else {
      console.error('No current route to update params for.');
    }
                params: { ...newRoutes[key].params, ...location.search },
              };
            }
          });
          return newRoutes;
        });
        // Trigger any necessary updates or re-renders
        window.dispatchEvent(new Event('routeReload'));
  };

  const updateParams = (params: { [key: string]: any }) => {
    // Placeholder for updateParams logic
    if (routes.current && routes.current.$$route) {
      const newParams = { ...routes.current.params, ...params };
      const path = routes.current.$$route.originalPath;
      const newPath = path.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      const searchParams = new URLSearchParams(location.search);
      Object.keys(params).forEach(key => {
        if (!routes.current.pathParams[key]) {
          searchParams.set(key, params[key]);
        }
      });
      window.history.pushState({}, '', `${newPath}?${searchParams.toString()}`);
    } else {
      console.error('No current route to update params for.');
    }
  };

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRoute;