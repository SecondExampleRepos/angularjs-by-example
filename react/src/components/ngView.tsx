import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

interface NgViewProps {
  routes: Route[];
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ routes, autoscroll, onload }) => {
  const location = useLocation();
  const [currentComponent, setCurrentComponent] = useState<React.ComponentType<any> | null>(null);
  const { someState, setSomeState, someFunction } = useRootScope();

  useEffect(() => {
    const matchRoute = () => {
      const matchedRoute = routes.find(route => {
        const match = route.exact ? location.pathname === route.path : location.pathname.startsWith(route.path);
        return match;
      });

      if (matchedRoute) {
        setCurrentComponent(() => matchedRoute.component);
        if (onload) {
          onload();
        }
      } else {
        setCurrentComponent(null);
      }
    };

    matchRoute();
  }, [location, routes, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [currentComponent, autoscroll]);

  return currentComponent ? React.createElement(currentComponent) : null;
};

export default NgView;