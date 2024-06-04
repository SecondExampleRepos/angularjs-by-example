import React, { useEffect, useState } from 'react';
import { useRootScope } from '../hooks/useRootScope';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: string;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const [currentView, setCurrentView] = useState<React.ReactNode>(null);
  const { exampleState, setExampleState, exampleFunction } = useRootScope();

  useEffect(() => {
    const handleRouteChangeSuccess = () => {
import { $route } from '../services/routeService'; // Assuming a service to handle route logic

const handleRouteChangeSuccess = () => {
  const current = $route.current;
  if (current && current.locals && current.locals.$template) {
    const newView = React.createElement('div', {
      dangerouslySetInnerHTML: { __html: current.locals.$template }
    });
    setCurrentView(newView);
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
    if (onload) {
      console.log('Component onload event triggered');
    }
  } else {
    setCurrentView(null);
  }
};
    };

    // Simulate AngularJS $on event listener for $routeChangeSuccess
    window.addEventListener('routeChangeSuccess', handleRouteChangeSuccess);

    return () => {
      window.removeEventListener('routeChangeSuccess', handleRouteChangeSuccess);
    };
  }, []);

  useEffect(() => {
    if (onload) {
      console.log('Component onload event triggered');
    }
  }, [onload]);

  return (
    <div>
      {currentView}
    </div>
  );
};

export default NgView;