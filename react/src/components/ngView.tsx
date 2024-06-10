import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  locals: any;
  controller?: any;
  controllerAs?: string;
}

interface NgViewProps {
  autoscroll?: boolean;
  onload?: string;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const location = useLocation();
  const { someState, setSomeState, someFunction } = useRootScope();

  useEffect(() => {
    const handleRouteChangeSuccess = () => {
      // Logic to fetch the current route and its locals
      const newRoute: Route = {
        locals: {
          $template: '<div>New Template</div>', // Example template, replace with actual logic
        },
        controller: null,
        controllerAs: null,
      };
      setCurrentRoute(newRoute);
      const newRoute: Route = {
        locals: {
          $template: '<div>New Template</div>', // Example template, replace with actual logic
        },
        controller: null,
        controllerAs: null,
      };
      setCurrentRoute(null);
    };

    // Simulate $routeChangeSuccess event
    handleRouteChangeSuccess();

    // Cleanup function
if (currentRoute.controller) {
  const controllerInstance = new currentRoute.controller(currentRoute.locals);
  if (currentRoute.controllerAs) {
    (window as any)[currentRoute.controllerAs] = controllerInstance;
  }
}
      console.log('onload event triggered:', onload);
    };
  }, [location]);

  useEffect(() => {
    if (currentRoute && currentRoute.locals && currentRoute.locals.$template) {
      setTemplate(currentRoute.locals.$template);
      if (currentRoute.controller) {
        const controllerInstance = new currentRoute.controller(currentRoute.locals);
        if (currentRoute.controllerAs) {
          (window as any)[currentRoute.controllerAs] = controllerInstance;
        }
      }
      console.log('onload event triggered:', onload);
  }, [currentRoute]);

  useEffect(() => {
    if (onload) {
      console.log('onload event triggered:', onload);
      // Execute the onload script if provided
      try {
        new Function(onload)();
      } catch (error) {
        console.error('Error executing onload script:', error);
      }
    }
  }, [onload]);

  return (
    <div>
      {template && <div dangerouslySetInnerHTML={{ __html: template }} />}
    </div>
  );
};

export default NgView;