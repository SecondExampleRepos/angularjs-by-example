// react/src/services/$route.ts

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
  loadedTemplateUrl?: string;
  locals?: { [key: string]: any };
}

interface RouteService {
  routes: { [key: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

export const useRoute = (): RouteService => {
  const { exampleState, setExampleState, exampleFunction } = useRootScope();
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  useEffect(() => {
    // Initialize or fetch data as needed

    const initializeRoutes = async () => {
      try {
        const response = await fetch('/api/routes');

    if (currentRoute) {
      // Trigger a state update to force a re-render and reload the current route
      setCurrentRoute({ ...currentRoute });
    } else {

      const newParams = { ...currentRoute.params, ...params };
      const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      setCurrentRoute({ ...currentRoute, params: newParams });
      window.history.pushState({}, '', newPath);
    } else {
      throw new Error('No route');
    }
  };

        const parsedRoutes: { [key: string]: Route } = {};
        data.forEach((route: any) => {
          parsedRoutes[route.originalPath] = {
            originalPath: route.originalPath,
            regexp: new RegExp(route.regexp),
            keys: route.keys,
            caseInsensitiveMatch: route.caseInsensitiveMatch,
            reloadOnSearch: route.reloadOnSearch,
            redirectTo: route.redirectTo,
            resolve: route.resolve,
            template: route.template,
            templateUrl: route.templateUrl,
            controller: route.controller,
            controllerAs: route.controllerAs,
            loadedTemplateUrl: route.loadedTemplateUrl,
            locals: route.locals,
          };
        });

        setRoutes(parsedRoutes);
      } catch (error) {
        console.error('Error initializing routes:', error);
      }
    };

    initializeRoutes();
  }, []);

  const reload = () => {

    if (currentRoute) {
      // Trigger a state update to force a re-render and reload the current route
      setCurrentRoute({ ...currentRoute });
    } else {

        const newParams = { ...currentRoute.params, ...params };
        const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
        setCurrentRoute({ ...currentRoute, params: newParams });
        window.history.pushState({}, '', newPath);
    } else {
        throw new Error('No route');
    }
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (currentRoute) {

      const newParams = { ...currentRoute.params, ...params };
      const newPath = currentRoute.originalPath.replace(/:(\w+)/g, (_, key) => newParams[key] || '');
      setCurrentRoute({ ...currentRoute, params: newParams });
      window.history.pushState({}, '', newPath);
    } else {
      throw new Error('No route');
    }
      throw new Error('No route');
    }
  };

  return {
    routes,
    reload,
    updateParams,
  };
};
