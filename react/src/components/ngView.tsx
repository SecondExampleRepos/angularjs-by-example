// react/src/components/ngView.tsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';
import { getTemplate, getController } from '../services/angularRouteService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: string;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const [template, setTemplate] = useState<string | null>(null);
  const [controller, setController] = useState<any>(null);
  const location = useLocation();
  const { state, setState } = useRootScope();

  useEffect(() => {
    const fetchTemplateAndController = async () => {
      const currentRoute = state.currentRoute;
      if (currentRoute && currentRoute.locals) {
        const { $template, controller: ctrl } = currentRoute.locals;
        if ($template) {
          setTemplate($template);
          if (ctrl) {
            const Controller = await getController(ctrl);
            setController(() => Controller);
          }
        }
      }
    };

    fetchTemplateAndController();
  }, [location, state.currentRoute]);

  useEffect(() => {
    if (onload) {
      // Execute the onload expression if provided
      new Function(onload)();
    }
  }, [template]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template]);

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
      {controller && React.createElement(controller, { $scope: state })}
    </div>
  );
};

export default NgView;