import { useState, useEffect } from 'react';

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
  pathParams?: { [key: string]: any };
  params?: { [key: string]: any };
  $$route?: Route;
}

interface RouteService {
  routes: { [key: string]: Route };
  reload: () => void;
  updateParams: (params: { [key: string]: any }) => void;
}

const useRoute = (): RouteService => {
  const [routes, setRoutes] = useState<{ [key: string]: Route }>({});
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [reloadFlag, setReloadFlag] = useState<boolean>(false);

  useEffect(() => {
    const handleLocationChangeStart = () => {
      const newRoute = determineCurrentRoute(); // Function to determine the current route based on the URL
      if (newRoute) {
        setCurrentRoute(newRoute);
        // Broadcast route change start event
      const newRoute = routes[window.location.pathname] || null;
          setCurrentRoute(newRoute);
          if (newRoute) {
            const newParams = { ...newRoute.params, ...window.location.search };
            newRoute.params = newParams;
            if (newRoute.redirectTo) {
              const redirectTo = typeof newRoute.redirectTo === 'function' 
                ? newRoute.redirectTo(newParams, window.location.pathname, window.location.search) 
                : newRoute.redirectTo;
              window.history.replaceState(null, '', redirectTo);
            }
          }
        window.dispatchEvent(event);
      }
    };

    // Trigger a location change to force route reload
    const event = new Event('locationChangeStart');
    window.dispatchEvent(event);
    setReloadFlag(false);
    const handleLocationChangeSuccess = () => {
      const newRoute = routes[window.location.pathname] || null;
      if (newRoute) {
        const newParams = { ...newRoute.params, ...window.location.search };
        newRoute.params = newParams;
        if (newRoute.redirectTo) {
          const redirectTo = typeof newRoute.redirectTo === 'function' 
            ? newRoute.redirectTo(newParams, window.location.pathname, window.location.search) 
            : newRoute.redirectTo;
          window.history.replaceState(null, '', redirectTo);
        }
      }
      setCurrentRoute(newRoute);
    };
    };
      setCurrentRoute({ ...currentRoute, params: newParams });
    const event = new Event('locationChangeStart');
    window.dispatchEvent(event);
    setReloadFlag(false);
    // Logic to handle location change success
    const handleLocationChangeSuccess = () => {
      const newRoute = determineCurrentRoute();
      setCurrentRoute({ ...currentRoute, params: newParams });
        setCurrentRoute(newRoute);
        // Broadcast route change success event
        const successEvent = new Event('locationChangeSuccess');
        window.dispatchEvent(successEvent);
      }
    };
    handleLocationChangeSuccess();
    window.addEventListener('locationChangeStart', handleLocationChangeStart);
    window.addEventListener('locationChangeSuccess', handleLocationChangeSuccess);

    return () => {
      // Cleanup event listeners
      window.removeEventListener('locationChangeStart', handleLocationChangeStart);
      window.removeEventListener('locationChangeSuccess', handleLocationChangeSuccess);
    };
  }, []);

  const reload = () => {
    setReloadFlag(true);
    const event = new Event('locationChangeStart');
    window.dispatchEvent(event);
  };

  const updateParams = (params: { [key: string]: any }) => {
    if (currentRoute && currentRoute.$$route) {
      currentRoute.params = newParams;
      const newParams = { ...currentRoute.params, ...params };
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