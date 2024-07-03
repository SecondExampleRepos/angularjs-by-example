import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { compile } from 'path-to-regexp';
import { getTemplate, getController } from '../services/angularRouteService'; // Assuming these services are created to fetch template and controller

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const location = useLocation();
  const [template, setTemplate] = useState<string | null>(null);
  const [controller, setController] = useState<any>(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      const currentRoute = getCurrentRoute(location.pathname); // Assuming this function is defined to get the current route
      if (currentRoute) {
        const template = await getTemplate(currentRoute.templateUrl);
        setTemplate(template);

        if (currentRoute.controller) {
          const controller = await getController(currentRoute.controller);
          setController(controller);
        }

        if (onload) {
          onload();
        }
      }
    };

    fetchRouteData();
  }, [location.pathname, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template && <div dangerouslySetInnerHTML={{ __html: template }} />}
      {controller && <controller.Component />}
    </div>
  );
};

export default NgView;

// Helper function to get the current route based on the path
const getCurrentRoute = (path: string) => {

  // Assuming we have a predefined set of routes
  const routes = [
    {
      path: '/',
      templateUrl: '/templates/home.html',
      controller: 'HomeController',
    },
    {
      path: '/about',
      templateUrl: '/templates/about.html',
      controller: 'AboutController',
    },
    // Add more routes as needed
  ];

  for (const route of routes) {
    const keys: any[] = [];
    const regexp = compile(route.path, { keys, strict: true });
    const match = regexp.exec(path);

    if (match) {
      const params = keys.reduce((acc, key, index) => {
        acc[key.name] = match[index + 1];
        return acc;
      }, {});

      return { ...route, params };
    }
  }

  return null;
};
  return null;
};
