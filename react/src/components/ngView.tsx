import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';
import { $route, $anchorScroll, $animate } from '../services/angularServices';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: string;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const { state } = useRootScope();
  const location = useLocation();
  const [currentView, setCurrentView] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handleRouteChangeSuccess = () => {
      const current = $route.current;
      const locals = current && current.locals;

      if (locals && locals.$template) {
        const newScope = state.$new();
        const newView = (
          <div>
            {/* Render the template */}
            <div dangerouslySetInnerHTML={{ __html: locals.$template }} />
          </div>
        );

        setCurrentView(newView);

        if (autoscroll) {
          $anchorScroll();
        }

        if (onload) {
          newScope.$eval(onload);
        }

        newScope.$emit('$viewContentLoaded');
      } else {
        setCurrentView(null);
      }
    };

    state.$on('$routeChangeSuccess', handleRouteChangeSuccess);
    handleRouteChangeSuccess(); // Initial call

    return () => {
      state.$off('$routeChangeSuccess', handleRouteChangeSuccess);
    };
  }, [location, state, autoscroll, onload]);

  return <div>{currentView}</div>;
};

export default NgView;