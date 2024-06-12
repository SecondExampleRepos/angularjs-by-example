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
}

const NgView: React.FC<NgViewProps> = ({ route, onRouteChangeSuccess }) => {
  const [template, setTemplate] = useState<string | null>(null);
  const { exampleState, setExampleState, exampleFunction } = useRootScope();

  useEffect(() => {
    const loadTemplate = async () => {
      if (route.locals && route.locals.$template) {
        setTemplate(route.locals.$template);
        onRouteChangeSuccess();
      } else {
        setTemplate(null);
      }
    };

    loadTemplate();
  }, [route, onRouteChangeSuccess]);

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
    </div>
  );
};

export default NgView;