import { useState, useEffect } from 'react';
import { useRootScope } from '../hooks/useRootScope';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { getTemplate, getController } from '../utils/templateUtils';

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
  controller?: string | ((params: any) => any);
  controllerAs?: string;
}

interface CurrentRoute {
  $$route: Route;
  params: any;
  pathParams: any;
  locals: any;
  loadedTemplateUrl?: string;
}

interface RouteService {
  routes: { [path: string]: Route };
  reload: () => void;
  updateParams: (params: any) => void;
}

const useRoute = (): RouteService => {
  const [current, setCurrent] = useState<CurrentRoute | null>(null);
  const [routes, setRoutes] = useState<{ [path: string]: Route }>({});
  const [reloadFlag, setReloadFlag] = useState(false);
  const { $rootScope } = useRootScope();
  const location = useLocation();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const handleLocationChange = () => {
      if (reloadFlag) {
        setReloadFlag(false);
        updateCurrentRoute();
      }
    };

    $rootScope.$on('$locationChangeStart', handleLocationChange);
    $rootScope.$on('$locationChangeSuccess', handleLocationChange);

    return () => {
      $rootScope.$off('$locationChangeStart', handleLocationChange);
      $rootScope.$off('$locationChangeSuccess', handleLocationChange);
    };
  }, [reloadFlag]);

  const updateCurrentRoute = () => {
    const newRoute = matchRoute(location.pathname);
    if (newRoute) {
      const locals = resolveLocals(newRoute);
      setCurrent({
        $$route: newRoute,
        params: { ...params },
        pathParams: extractPathParams(newRoute, location.pathname),
        locals,
      });
      $rootScope.$broadcast('$routeChangeSuccess', newRoute, current);
    } else {
      setCurrent(null);
    }
  };

  const matchRoute = (path: string): Route | null => {
    for (const routePath in routes) {
      const route = routes[routePath];
      const match = route.regexp.exec(path);
      if (match) {
        return route;
      }
    }
    return null;
  };

  const extractPathParams = (route: Route, path: string) => {
    const params: any = {};
    const match = route.regexp.exec(path);
    if (match) {
      route.keys.forEach((key, index) => {
        params[key.name] = match[index + 1];
      });
    }
    return params;
  };

  const resolveLocals = (route: Route) => {
    const locals: any = {};
    if (route.resolve) {
      for (const key in route.resolve) {
        const resolver = route.resolve[key];
        locals[key] = typeof resolver === 'string' ? getController(resolver) : resolver();
      }
    }
    if (route.template) {
      locals.$template = typeof route.template === 'function' ? route.template(params) : route.template;
    } else if (route.templateUrl) {
      locals.$template = getTemplate(route.templateUrl);
    }
    return locals;
  };

  const reload = () => {
    setReloadFlag(true);
    $rootScope.$evalAsync(() => {
      updateCurrentRoute();
    });
  };

  const updateParams = (newParams: any) => {
    if (current && current.$$route) {
      const updatedParams = { ...current.params, ...newParams };
      const path = interpolate(current.$$route.originalPath, updatedParams);
      history.push(path);
    } else {
      throw new Error('No route to update');
    }
  };

  const interpolate = (path: string, params: any) => {
    return path.replace(/:(\w+)/g, (_, key) => params[key] || '');
  };

  return {
    routes,
    reload,
    updateParams,
  };
};

export default useRoute;