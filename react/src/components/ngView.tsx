import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRootScope } from '../hooks/useRootScope';
import { $route, $routeParams } from '../services/routeService';
import { $templateRequest, $sce } from '../services/templateService';
import { $animate } from '../services/animateService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const [template, setTemplate] = useState<string | null>(null);
  const [currentScope, setCurrentScope] = useState<any>(null);
  const location = useLocation();
  const { $rootScope } = useRootScope();

  useEffect(() => {
    const handleRouteChangeSuccess = () => {
      const current = $route.current;
      const locals = current && current.locals;

      if (locals && locals.$template) {
        const newScope = $rootScope.$new();
        setTemplate(locals.$template);
        setCurrentScope(newScope);

        if (onload) {
          onload();
        }

        if (autoscroll) {
          window.scrollTo(0, 0);
        }

        newScope.$emit('$viewContentLoaded');
        newScope.$eval(onload);
      } else {
        setTemplate(null);
        if (currentScope) {
          currentScope.$destroy();
          setCurrentScope(null);
        }
      }
    };

    $rootScope.$on('$routeChangeSuccess', handleRouteChangeSuccess);
    handleRouteChangeSuccess();

    return () => {
      if (currentScope) {
        currentScope.$destroy();
      }
    };
  }, [location, autoscroll, onload, $rootScope, currentScope]);

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
    </div>
  );
};

export default NgView;