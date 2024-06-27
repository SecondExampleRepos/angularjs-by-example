// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useRootScope } from '../hooks/useRootScope';
import { useLocation } from 'react-router-dom';
import { fetchTemplate, fetchController } from '../services/angularRouteService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const [template, setTemplate] = useState<string | null>(null);
  const [controller, setController] = useState<any>(null);
  const { $rootScope } = useRootScope();
  const location = useLocation();

  useEffect(() => {
    const loadView = async () => {
      try {
        const currentRoute = $rootScope.currentRoute;
        if (currentRoute && currentRoute.locals && currentRoute.locals.$template) {
          const template = await fetchTemplate(currentRoute.locals.$template);
          setTemplate(template);

          if (currentRoute.controller) {
            const controller = await fetchController(currentRoute.controller);
            setController(controller);
          }

          if (onload) {
            onload();
          }

          if (autoscroll) {
            window.scrollTo(0, 0);
          }
        }
      } catch (error) {
        console.error('Error loading view:', error);
      }
    };

    loadView();
  }, [location, $rootScope, autoscroll, onload]);

  return (
    <div>
      {template && <div dangerouslySetInnerHTML={{ __html: template }} />}
      {controller && <controller />}
    </div>
  );
};

export default NgView;
