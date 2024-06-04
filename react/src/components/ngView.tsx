import React, { useEffect, useState } from 'react';
import { useRootScope } from '../hooks/useRootScope';

interface Route {
  locals: any;
  controller?: string;
  controllerAs?: string;
}

interface NgViewProps {
  route: Route;
  onRouteChangeSuccess: () => void;
  onRouteChangeError: (error: any) => void;
}

const NgView: React.FC<NgViewProps> = ({ route, onRouteChangeSuccess, onRouteChangeError }) => {
  const [template, setTemplate] = useState<string | null>(null);
  const { state, updateState } = useRootScope();

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        if (route.locals && route.locals.$template) {
          setTemplate(route.locals.$template);
          onRouteChangeSuccess();
        } else {
          setTemplate(null);
        }
      } catch (error) {
        onRouteChangeError(error);
      }
    };

    loadTemplate();
  }, [route, onRouteChangeSuccess, onRouteChangeError]);

  return (
    <div>
      {template ? (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      ) : (
        <div>No template available</div>
      )}
    </div>
  );
};

export default NgView;