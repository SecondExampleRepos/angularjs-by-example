import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTemplate, getController } from '../services/ngViewService';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const location = useLocation();
  const [template, setTemplate] = useState<string | null>(null);
  const [controller, setController] = useState<any>(null);

  useEffect(() => {
    const fetchTemplateAndController = async () => {
      const currentTemplate = await getTemplate(location.pathname);
      setTemplate(currentTemplate);

      const currentController = await getController(location.pathname);
      setController(() => currentController);

      if (onload) {
        onload();
      }
    };

    fetchTemplateAndController();
  }, [location.pathname, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div>
      {template && (
        <div dangerouslySetInnerHTML={{ __html: template }} />
      )}
      {controller && React.createElement(controller)}
    </div>
  );
};

export default NgView;
