import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentRoute, getRouteTemplate, getRouteController } from '../services/routeService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
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

        if (onload) {
          onload();
        }

        if (autoscroll) {
          window.scrollTo(0, 0);
        }
      } else {
        setTemplate(null);
        setController(null);
      }
    };

    updateView();
  }, [location, autoscroll, onload]);

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
      {controller && (
        <controller.Component />
      )}
    </div>
  );
};

export default NgView;
