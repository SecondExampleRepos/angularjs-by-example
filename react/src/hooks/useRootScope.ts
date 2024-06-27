// src/app.js

import { useState, useEffect } from 'react';

// Define the useRootScope hook
export const useRootScope = () => {
  // Define state variables and functions that were previously in $rootScope
  const [exampleState, setExampleState] = useState(null);

  useEffect(() => {
    // Initialize or fetch data as needed

    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            const data = await response.json();

    // Example logic for the function
    console.log('exampleFunction called');
    // Add more logic as needed
  };
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  // Define any functions that were previously in $rootScope
  const exampleFunction = () => {

    // Example logic for the function
    console.log('exampleFunction called');
    // Add more logic as needed
  };

  // Return the state and functions
  return {
    exampleState,
    setExampleState,
    exampleFunction,
  };
};
