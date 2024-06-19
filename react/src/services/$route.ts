import { useState, useEffect } from 'react';
import { useRootScope } from '../hooks/useRootScope';

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
  controller?: string | ((scope: any, locals: any) => void);
  controllerAs?: string;
  locals?: { [key: string]: any };
  loadedTemplateUrl?: string;
}

interface RouteService {
  routes: { [key: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

const useRouteService = (): RouteService => {
  const { state: rootScope, updateState: updateRootScope } = useRootScope();
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});

  const reload = () => {

    const currentRoute = rootScope.current;
    if (currentRoute) {
      const newRoute = { ...currentRoute, reloadOnSearch: true };

    if (rootScope.current && rootScope.current.$$route) {
      const newParams = { ...rootScope.current.params, ...params };
      const pathParams = Object.keys(params).reduce((acc, key) => {

    // Initialize routes from some source, e.g., a configuration file or API
    const initializeRoutes = async () => {
      try {
        // Example: Fetch routes from an API or define them statically
        const fetchedRoutes = await fetch('/api/routes').then(res => res.json());
        
        // Process and set the routes
        const processedRoutes = fetchedRoutes.reduce((acc: { [key: string]: Route }, route: any) => {
          const keys = []; // Extract keys from route if necessary
          const regexp = new RegExp(route.path); // Convert path to RegExp if necessary
          acc[route.path] = { ...route, keys, regexp };
          return acc;
        }, {});

        setRoutes(processedRoutes);
      } catch (error) {
        console.error('Failed to initialize routes:', error);
      }
    };

    initializeRoutes();
  }, []);
          acc[key] = params[key];
        }
        return acc;
      }, {});

      const newPath = rootScope.current.$$route.originalPath.split(':').map((segment, index) => {
        if (index === 0) return segment;
        const [key, rest] = segment.split(/(\w+)(?:[?*])?(.*)/).filter(Boolean);
        return `${newParams[key] || ''}${rest || ''}`;
      }).join('');

      updateRootScope({
        current: {
          ...rootScope.current,
          params: newParams,
          pathParams: { ...rootScope.current.pathParams, ...pathParams },
        },
      });

      // Assuming we have a function to update the URL path and search params
      updateUrlPath(newPath, newParams);
    } else {
      throw new Error('No current route to update parameters for.');
    }
  };
  };

  const updateParams = (params: { [key: string]: any }) => {

    if (rootScope.current && rootScope.current.$$route) {
      const newParams = { ...rootScope.current.params, ...params };
      const pathParams = Object.keys(params).reduce((acc, key) => {

    const initializeRoutes = async () => {
      try {
        // Example: Fetch routes from an API or define them statically
        const fetchedRoutes = await fetch('/api/routes').then(res => res.json());
        
        // Process and set the routes
        const processedRoutes = fetchedRoutes.reduce((acc: { [key: string]: Route }, route: any) => {
          const keys = []; // Extract keys from route if necessary
          const regexp = new RegExp(route.path); // Convert path to RegExp if necessary
          acc[route.path] = { ...route, keys, regexp };
          return acc;
        }, {});

        setRoutes(processedRoutes);
      } catch (error) {
        console.error('Failed to initialize routes:', error);
      }
    };

    initializeRoutes();
  }, []);
          acc[key] = params[key];
        }
        return acc;
      }, {});

      const newPath = rootScope.current.$$route.originalPath.split(':').map((segment, index) => {
        if (index === 0) return segment;
        const [key, rest] = segment.split(/(\w+)(?:[?*])?(.*)/).filter(Boolean);
        return `${newParams[key] || ''}${rest || ''}`;
      }).join('');

      updateRootScope({
        current: {
          ...rootScope.current,
          params: newParams,
          pathParams: { ...rootScope.current.pathParams, ...pathParams },
        },
      });

      // Assuming we have a function to update the URL path and search params
      updateUrlPath(newPath, newParams);
    } else {
      throw new Error('No current route to update parameters for.');
    }
  };

  useEffect(() => {

    const initializeRoutes = async () => {
      try {
        // Example: Fetch routes from an API or define them statically
        const fetchedRoutes = await fetch('/api/routes').then(res => res.json());
        
        // Process and set the routes
        const processedRoutes = fetchedRoutes.reduce((acc: { [key: string]: Route }, route: any) => {
          const keys = []; // Extract keys from route if necessary
          const regexp = new RegExp(route.path); // Convert path to RegExp if necessary
          acc[route.path] = { ...route, keys, regexp };
          return acc;
        }, {});

        setRoutes(processedRoutes);
      } catch (error) {
        console.error('Failed to initialize routes:', error);
      }
    };

    initializeRoutes();
  }, []);

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRouteService;