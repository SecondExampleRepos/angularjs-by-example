// react/src/services/$routeParams.ts

// Define the $routeParams service as a React hook
const useRouteParams = () => {
  // Placeholder for the route parameters
  const params: { [key: string]: any } = {};

  // Function to get a specific route parameter
  const getParam = (key: string) => {
    return params[key];
  };

  // Function to set a specific route parameter
  const setParam = (key: string, value: any) => {
    params[key] = value;
  };

  // Function to clear all route parameters
  const clearParams = () => {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        delete params[key];
      }
    }
  };

  return {
    getParam,
    setParam,
    clearParams,
  };
};

export default useRouteParams;