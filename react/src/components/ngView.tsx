// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentRoute, getRouteTemplate, getRouteController } from '../services/routeService';

const NgView: React.FC = () => {
  const location = useLocation();
  const [template, setTemplate] = useState<string | null>(null);
  const [controller, setController] = useState<any>(null);

  useEffect(() => {
    const updateView = async () => {
      const currentRoute = getCurrentRoute(location.pathname);
      if (currentRoute) {
        const template = await getRouteTemplate(currentRoute);
        setTemplate(template);

        const controller = getRouteController(currentRoute);
        setController(controller);
      } else {
        setTemplate(null);
        setController(null);
      }
    };

    updateView();
  }, [location]);

  useEffect(() => {
    if (controller) {
      // Initialize controller if needed
      if (typeof controller === 'function') {
        controller();
      } else if (controller && typeof controller.init === 'function') {
        controller.init();
      }
    }
  }, [controller]);

  return (
    <div>
      {template ? (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      ) : (
        <div>No view available</div>
      )}
    </div>
  );
};

export default NgView;