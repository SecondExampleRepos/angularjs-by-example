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
      // SECOND AGENT: [MISSING CONTEXT] - Fetch the template based on the current route
      const template = await fetchTemplateForRoute(location.pathname);
      setTemplate(template);
      if (onload) {
        onload();
      }
    };

    fetchTemplate();

    return () => {
      // Cleanup if necessary
    };
  }, [location, onload]);

  useEffect(() => {
    if (autoscroll) {
      window.scrollTo(0, 0);
    }
  }, [template, autoscroll]);

  return (
    <div dangerouslySetInnerHTML={{ __html: template || '' }} />
  );
};

export default NgView;

// SECOND AGENT: [MISSING CONTEXT] - Function to fetch the template for the current route
async function fetchTemplateForRoute(pathname: string): Promise<string> {

  try {
    const response = await fetch(`/templates${pathname}.html`);
    if (!response.ok) {
      throw new Error(`Failed to fetch template for route: ${pathname}`);
    }
    const template = await response.text();
    return template;
  } catch (error) {
    console.error(error);
    return '';
  }
}
  return '';
}
