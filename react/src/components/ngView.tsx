import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface NgViewProps {
  autoscroll?: boolean;
  onload?: () => void;
}

const NgView: React.FC<NgViewProps> = ({ autoscroll, onload }) => {
  const location = useLocation();
  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {

      try {
        // Assuming we have a function `getTemplateForRoute` that fetches the template based on the current route
        const response = await fetch(`/api/templates${location.pathname}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const templateText = await response.text();
        setTemplate(templateText);
      } catch (error) {
        console.error('Failed to fetch template:', error);
        setTemplate('<div>Error loading template</div>');
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
