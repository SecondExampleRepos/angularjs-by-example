import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
  // Add other route properties as needed
}

interface NgViewProps {
  routes: Route[];
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ routes, autoscroll, onload }) => {
  const location = useLocation();
  const { someState, setSomeState, someFunction } = useRootScope();
  const [currentComponent, setCurrentComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const matchRoute = () => {
      const matchedRoute = routes.find(route => {
        // Implement route matching logic here
        // This is a simple example, you might need a more complex matching logic
        return route.path === location.pathname;
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

  return (
    <div>
      {currentComponent ? React.createElement(currentComponent) : null}
    </div>
  );
};

export default NgView;