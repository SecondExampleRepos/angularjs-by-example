// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  locals: any;
  controller?: string;
  controllerAs?: string;
}

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const location = useLocation();
  const { exampleFunction } = useRootScope();

  useEffect(() => {
    const handleRouteChangeSuccess = () => {
      // Logic to fetch the current route and its template
      const route: Route = {
        locals: {
          $template: '<div>Example Template</div>', // Example template, replace with actual logic
        },
        controller: 'ExampleController',
        controllerAs: 'exampleCtrl',
      };

      setCurrentRoute(route);
      setTemplate(route.locals.$template);

      if (onload) {
        onload();
      }
      const route: Route = {
        locals: {
          $template: '<div>Example Template</div>', // Example template, replace with actual logic
        },
        controller: 'ExampleController',
        controllerAs: 'exampleCtrl',
      };

      setCurrentRoute(route);
      setTemplate(route.locals.$template);

      if (onload) {
        onload();
      }
    };

    // Simulate route change success event
    handleRouteChangeSuccess();

    // Cleanup function
    return () => {
      setCurrentRoute(null);
      setTemplate(null);
    };
  }, [location, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
    </div>
  );
};

export default NgView;