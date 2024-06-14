import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
}

interface NgViewProps {
  routes: Route[];
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ routes, autoscroll, onload }) => {
  const location = useLocation();
  const { exampleState, setExampleState, exampleFunction } = useRootScope();
  const [currentComponent, setCurrentComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const matchRoute = () => {
      const matchedRoute = routes.find(route => {
        const match = matchPath(location.pathname, {
          path: route.path,
          exact: route.exact,
          strict: route.strict,
          sensitive: route.sensitive,
        });
        return match !== null;
      });

      if (matchedRoute) {
        setCurrentComponent(() => matchedRoute.component);
      } else {
        setCurrentComponent(null);
      }
    };

    matchRoute();

    if (autoscroll) {
      window.scrollTo(0, 0);
    }

    if (onload) {
      onload();
    }
  }, [location, routes, autoscroll, onload]);

  return currentComponent ? React.createElement(currentComponent) : null;
};

export default NgView;