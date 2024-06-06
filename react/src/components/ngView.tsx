// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRoute, Route } from '../services/routeService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const route = getRoute(location.pathname);
      if (route) {
        setCurrentRoute(route);
        const template = await route.resolveTemplate();
        setTemplate(template);
        if (onload) {
          onload();
        }
      } else {
        setCurrentRoute(null);
        setTemplate(null);
      }
    };

    fetchRoute();
  }, [location.pathname, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template ? (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default NgView;