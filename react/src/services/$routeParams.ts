// react/src/services/$routeParams.ts

// Define the $routeParams service as a React hook
import { useState, useEffect } from 'react';

interface RouteParams {
  [key: string]: string;
}

const useRouteParams = () => {
  const [params, setParams] = useState<RouteParams>({});

  useEffect(() => {

    const updateParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const params: RouteParams = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      setParams(params);
    };

    // Update params on initial load
    updateParams();

    // Add event listener for route changes
    window.addEventListener('popstate', updateParams);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('popstate', updateParams);
    };
  }, []);

  return params;
};

export default useRouteParams;