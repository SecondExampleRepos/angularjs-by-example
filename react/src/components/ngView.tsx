import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const location = useLocation();
  const [template, setTemplate] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {

      try {
        // Assuming we have a function `getTemplateForRoute` that fetches the template based on the current route
        const template = await getTemplateForRoute(location.pathname);
        setTemplate(template);
      } catch (error) {
        console.error('Error fetching template:', error);
        setTemplate(<div>Error loading template</div>);
      }
    };

    fetchTemplate();

    if (onload) {
      onload();
    }

    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [location, autoscroll, onload]);

  return <div>{template}</div>;
};

export default NgView;
