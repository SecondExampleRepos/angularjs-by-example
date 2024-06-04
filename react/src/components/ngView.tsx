import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';
import { fetchTemplate, fetchController } from '../services/angularRouteService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const location = useLocation();
  const { someState, setSomeState, someFunction } = useRootScope();
  const [template, setTemplate] = useState<string | null>(null);
  const [controller, setController] = useState<any>(null);

  useEffect(() => {
    const loadView = async () => {
      try {
        const currentRoute = location.pathname; // Assuming the route is based on the pathname
        const template = await fetchTemplate(currentRoute);
        setTemplate(template);

        const controller = await fetchController(currentRoute);
        setController(controller);

        if (onload) {
          onload();
        }
      } catch (error) {
        console.error('Error loading view:', error);
      }
    };

    loadView();
  }, [location, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template && <div dangerouslySetInnerHTML={{ __html: template }} />}
      {controller && React.createElement(controller, { someState, setSomeState, someFunction })}
    </div>
  );
};

export default NgView;