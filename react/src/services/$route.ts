// react/src/services/$route.ts

import { useState, useEffect, useContext, createContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { cloneDeep, isEqual } from 'lodash';

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

const RouteContext = createContext<RouteService | undefined>(undefined);

export const RouteProvider: React.FC = ({ children }) => {
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const handleLocationChange = () => {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        if (newRoute.locals) {
          const resolvePromises = Object.keys(newRoute.locals).map(key => {
            const resolver = newRoute.locals![key];
            return typeof resolver === 'function' ? resolver() : resolver;
          });
          Promise.all(resolvePromises).then(resolvedLocals => {
            const locals = resolvedLocals.reduce((acc, value, index) => {
              acc[Object.keys(newRoute.locals!)[index]] = value;
              return acc;
            }, {} as { [key: string]: any });
            setCurrentRoute({ ...newRoute, locals });
            // Trigger any additional logic for route change success
          }).catch(error => {
            console.error('Error resolving route locals:', error);
          });
        } else {
          // Trigger any additional logic for route change success
        }
      }
    };

    handleLocationChange();
    return history.listen(handleLocationChange);
  }, [location, history]);
    if (currentRoute) {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        // Handle route change success logic
        // Assuming we need to broadcast a route change success event
        // and update the route parameters
        const params = { ...newRoute.params, ...location.search };
        setCurrentRoute({ ...newRoute, params });
      }
    }
  const matchRoute = (path: string): Route | null => {
    for (const key in routes) {
      const route = routes[key];
      const match = route.regexp.exec(path);
      if (match) {
        const params: { [key: string]: string } = {};
        route.keys.forEach((key, index) => {
          params[key.name] = match[index + 1];
        });
        return { ...route, params };
      }
    }
    return null;
  };

  const reload = () => {
    if (currentRoute) {
      const newRoute = matchRoute(location.pathname);
      if (newRoute) {
        setCurrentRoute(newRoute);
        // Handle route change success logic
        const params = { ...newRoute.params, ...location.search };
        setCurrentRoute({ ...newRoute, params });
      }
    }
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (currentRoute) {
      const newParams = { ...currentRoute.params, ...params };
      const newPath = generatePath(currentRoute.originalPath, newParams);
      history.push(newPath);
    }
  };

  const generatePath = (path: string, params: { [key: string]: any }): string => {
    return path.replace(/:([^/]+)/g, (_, key) => params[key] || '');
  };

  return (
    <RouteContext.Provider value={{ routes, reload, updateParams }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = (): RouteService => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within a RouteProvider');
  }
  return context;
};