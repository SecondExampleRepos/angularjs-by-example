import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  locals: any;
  controller?: string;
  controllerAs?: string;
}

interface NgViewProps {
  routes: { [key: string]: Route };
}

const NgView: React.FC<NgViewProps> = ({ routes }) => {
  const location = useLocation();
  const { exampleState, setExampleState, exampleFunction, user, setUser, isAuthenticated, setIsAuthenticated } = useRootScope();
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  useEffect(() => {
    const path = location.pathname;
    const route = routes[path] || null;
    setCurrentRoute(route);
  }, [location, routes]);

  useEffect(() => {
    if (currentRoute && currentRoute.locals) {
      // Assuming we need to fetch some initial data or set up event listeners
      const fetchData = async () => {
        try {
          // Example: Fetch initial data from an API
          const response = await fetch('/api/data');
          const data = await response.json();
          // Update state with the fetched data
          setExampleState(data.exampleState);
          setUser(data.user);
          setIsAuthenticated(data.isAuthenticated);
        } catch (error) {
          console.error('Error fetching initial data:', error);
        }
      };

      fetchData();
    }
  }, [currentRoute, setExampleState, setUser, setIsAuthenticated]);

  if (!currentRoute || !currentRoute.locals.$template) {
    return null;
  }

  const TemplateComponent = currentRoute.locals.$template;

  return (
    <div>
      {currentRoute.controller && (
        <TemplateComponent
          {...currentRoute.locals}
          $scope={{ exampleState, setExampleState, exampleFunction, user, setUser, isAuthenticated, setIsAuthenticated }}
        />
      )}
    </div>
  );
};

export default NgView;