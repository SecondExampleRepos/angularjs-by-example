import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getRoute, Route } from '../services/routeService';

interface NgViewProps {
  onViewContentLoaded?: () => void;
  onRouteChangeSuccess?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ onViewContentLoaded, onRouteChangeSuccess }) => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    const loadRoute = async () => {
      const route = getRoute(location.pathname);
      if (route) {
        setCurrentRoute(route);
        if (route.templateUrl) {
          const response = await fetch(route.templateUrl);
          const templateText = await response.text();
          setTemplate(templateText);
        } else if (route.template) {
          setTemplate(route.template);
        }
        if (onViewContentLoaded) {
          onViewContentLoaded();
        }
        if (onRouteChangeSuccess) {
          onRouteChangeSuccess();
        }
      }
    };

    loadRoute();
  }, [location, onViewContentLoaded, onRouteChangeSuccess]);

  return (
    <div dangerouslySetInnerHTML={{ __html: template || '' }} />
  );
};

export default NgView;