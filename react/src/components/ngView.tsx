// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  locals: any;
  controller?: string;
  controllerAs?: string;
  template?: string;
  templateUrl?: string;
  resolve?: any;
  redirectTo?: string | ((params: any, path: string, search: any) => string);
}

interface NgViewProps {
  routes: { [key: string]: Route };
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ routes, autoscroll, onload }) => {
  const location = useLocation();
  const { exampleState, setExampleState, exampleFunction } = useRootScope();
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    const path = location.pathname;
    const route = routes[path] || routes[null];
    if (route) {
      setCurrentRoute(route);
      if (route.template) {
        setTemplate(route.template);
      } else if (route.templateUrl) {
        // Fetch the template from the URL
        fetch(route.templateUrl)
          .then(response => response.text())
          .then(template => setTemplate(template));
      }
    }
  }, [location, routes]);

  useEffect(() => {
    if (currentRoute && currentRoute.locals) {
      // Handle controller logic if needed
      if (currentRoute.controller) {

        const controllerName = currentRoute.controller;
        const controllerAs = currentRoute.controllerAs || controllerName;
        const controllerLocals = currentRoute.locals;

        // Assuming controllers are functions that we can call with the locals
        if (typeof window[controllerName] === 'function') {
          const controllerInstance = new window[controllerName](controllerLocals);
          if (controllerAs) {
            window[controllerAs] = controllerInstance;
          }
        } else {
          console.error(`Controller ${controllerName} is not defined or not a function`);
        }
      }
      }
      if (onload) {
        onload();
      }
    }
  }, [currentRoute, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template && <div dangerouslySetInnerHTML={{ __html: template }} />}
    </div>
  );
};

export default NgView;