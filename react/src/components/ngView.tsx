// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTemplate, fetchController } from '../services/angularRouteService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const location = useLocation();
  const [template, setTemplate] = useState<string | null>(null);
  const [controller, setController] = useState<any>(null);

  useEffect(() => {
    const loadRoute = async () => {
      const currentRoute = getCurrentRoute(location.pathname);
      if (currentRoute) {
        const template = await fetchTemplate(currentRoute.templateUrl);
        setTemplate(template);

        if (currentRoute.controller) {
          const controller = await fetchController(currentRoute.controller);
          setController(controller);
        }

        if (onload) {
          onload();
        }
      }
    };

    loadRoute();
  }, [location.pathname, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  const getCurrentRoute = (path: string) => {
// Define a mock route configuration for demonstration purposes
const routes = [
  {
    path: '/',
    templateUrl: '/templates/home.html',
    controller: 'HomeController',
  },
  {
    path: '/about',
{controller && React.createElement(controller)}
    controller: 'AboutController',
  },
  // Add more routes as needed
];

const getCurrentRoute = (path: string) => {
  // Find the route that matches the current path
  const route = routes.find(route => route.path === path);
  return route || null;
};
    return null;
  };

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
      {controller && React.createElement(controller)}
    </div>
  );
};

export default NgView;