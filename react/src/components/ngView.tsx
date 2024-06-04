import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { compile } from 'react-dom';
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

        const controller = await getRouteController(currentRoute);
        setController(controller);

        if (onload) {
          onload();
        }
      }
    };

    updateView();
  }, [location, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template && compile(template)}
      {controller && controller()}
    </div>
  );
};

export default NgView;