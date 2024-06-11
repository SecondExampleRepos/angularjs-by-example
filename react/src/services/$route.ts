import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTemplate, fetchController } from '../utils/api'; // Assuming these utility functions exist

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
  controller?: string | ((params: any) => string);
  controllerAs?: string;
}

interface CurrentRoute {
  $$route: Route;
  params: { [key: string]: any };
  pathParams: { [key: string]: any };
  locals?: { [key: string]: any };
}

const useRoute = () => {
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const [current, setCurrent] = useState<CurrentRoute | null>(null);
  const location = useLocation();

  const reload = () => {

    const path = location.pathname;
    const route = Object.values(routes).find(route => route.regexp.test(path));
    if (route) {
      const params = extractParams(route, path);
      const newCurrent: CurrentRoute = {
        $$route: route,

      const searchParams = new URLSearchParams(newParams).toString();
      window.history.pushState({}, '', `${path}?${searchParams}`);
        pathParams: params,
      };
      setCurrent(newCurrent);
      // Fetch and set template and controller
      if (route.templateUrl) {
        const templateUrl = typeof route.templateUrl === 'function' ? route.templateUrl(params) : route.templateUrl;
        fetchTemplate(templateUrl).then(template => {
          newCurrent.locals = { ...newCurrent.locals, $template: template };
          setCurrent(newCurrent);
        });
      } else if (route.template) {
        const template = typeof route.template === 'function' ? route.template(params) : route.template;
        newCurrent.locals = { ...newCurrent.locals, $template: template };
        setCurrent(newCurrent);
      }

      if (route.controller) {
        const controllerName = typeof route.controller === 'function' ? route.controller(params) : route.controller;
        fetchController(controllerName).then(controller => {
          newCurrent.locals = { ...newCurrent.locals, $controller: controller };
          setCurrent(newCurrent);
        });
      }
    }


        // Fetch and set template and controller
        const fetchAndSetTemplateAndController = async () => {
            try {
                let template = '';
                if (typeof route.template === 'function') {
                    template = route.template(params);
                } else if (route.template) {
                    template = route.template;
                } else if (route.templateUrl) {
                    const templateUrl = typeof route.templateUrl === 'function' ? route.templateUrl(params) : route.templateUrl;
                    template = await fetchTemplate(templateUrl);
                }

    window.addEventListener('popstate', handleLocationChange);
                let controller = null;

      // Remove event listener for location changes
      window.removeEventListener('popstate', handleLocationChange);
    };
                    const controllerName = typeof route.controller === 'function' ? route.controller(params) : route.controller;
                    controller = await fetchController(controllerName);
                }

                setCurrent({
                    ...newCurrent,
                    locals: {
                        $template: template,
                        $controller: controller,
                    },
                });
            } catch (error) {
                console.error('Error fetching template or controller:', error);
            }
        };

        fetchAndSetTemplateAndController();
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (current && current.$$route) {
      const newParams = { ...current.params, ...params };
      const path = interpolate(current.$$route.originalPath, newParams);

      const searchParams = new URLSearchParams(newParams).toString();
      window.history.pushState({}, '', `${path}?${searchParams}`);
    } else {
      throw new Error('No route');
    }
  };

  const interpolate = (path: string, params: { [key: string]: any }) => {
    const segments = path.split(':');
    return segments.map((segment, index) => {
      if (index === 0) return segment;
      const [key, rest] = segment.split(/(\w+)(?:[?*])?(.*)/).filter(Boolean);
      return params[key] + (rest || '');
    }).join('');
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const path = location.pathname;
      const route = Object.values(routes).find(route => route.regexp.test(path));
      if (route) {
        const params = extractParams(route, path);
        const newCurrent: CurrentRoute = {
          $$route: route,
          params,
          pathParams: params,

        const fetchAndSetTemplateAndController = async () => {
            try {
                let template = '';
                if (typeof route.template === 'function') {
                    template = route.template(params);
                } else if (route.template) {
                    template = route.template;
                } else if (route.templateUrl) {
                    const templateUrl = typeof route.templateUrl === 'function' ? route.templateUrl(params) : route.templateUrl;
                    template = await fetchTemplate(templateUrl);
                }

                let controller = null;

    window.addEventListener('popstate', handleLocationChange);
                    const controllerName = typeof route.controller === 'function' ? route.controller(params) : route.controller;

      window.removeEventListener('popstate', handleLocationChange);
    };
                }

                setCurrent({
                    ...newCurrent,
                    locals: {
                        $template: template,
                        $controller: controller,
                    },
                });
            } catch (error) {
                console.error('Error fetching template or controller:', error);
            }
        };

        fetchAndSetTemplateAndController();
        setCurrent(newCurrent);

        const fetchAndSetTemplateAndController = async () => {
            try {
                let template = '';
                if (typeof route.template === 'function') {
                    template = route.template(params);
                } else if (route.template) {
                    template = route.template;
                } else if (route.templateUrl) {
                    const templateUrl = typeof route.templateUrl === 'function' ? route.templateUrl(params) : route.templateUrl;
                    template = await fetchTemplate(templateUrl);
                }

                let controller = null;

    window.addEventListener('popstate', handleLocationChange);
                    const controllerName = typeof route.controller === 'function' ? route.controller(params) : route.controller;

      window.removeEventListener('popstate', handleLocationChange);
    };
                }

                setCurrent({
                    ...newCurrent,
                    locals: {
                        $template: template,
                        $controller: controller,
                    },
                });
            } catch (error) {
                console.error('Error fetching template or controller:', error);
            }
        };

        fetchAndSetTemplateAndController();
      }
    };

    const extractParams = (route: Route, path: string) => {
      const match = route.regexp.exec(path);
      if (!match) return {};
      return route.keys.reduce((params, key, index) => {
        params[key.name] = match[index + 1];
        return params;
      }, {} as { [key: string]: any });
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);


      window.removeEventListener('popstate', handleLocationChange);
    };
      window.removeEventListener('popstate', handleLocationChange);
    };

    return () => {

      window.removeEventListener('popstate', handleLocationChange);
    };
    };
  }, [location, routes]);

  return {
    routes,
    current,
    reload,
    updateParams,
  };
};

export default useRoute;