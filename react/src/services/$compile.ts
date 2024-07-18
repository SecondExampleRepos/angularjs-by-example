// react/src/services/$compile.ts

import { useEffect, useRef } from 'react';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const $compile: CompileService = {
  compile: (element, scope) => {

    // Create a ref to the element
    const elementRef = useRef(element);

    // Use useEffect to handle the component lifecycle
    useEffect(() => {
      // Function to update the element with the scope data
      const updateElement = () => {
        if (elementRef.current) {
          // Assuming scope is an object with key-value pairs to be set as attributes
          Object.keys(scope).forEach(key => {
            elementRef.current.setAttribute(key, scope[key]);
          });
        }
      };

      // Initial update
      updateElement();

      // Return a cleanup function to remove attributes when the component unmounts
      return () => {
        if (elementRef.current) {
          Object.keys(scope).forEach(key => {
            elementRef.current.removeAttribute(key);
          });
        }
      };
    }, [scope]); // Re-run the effect if the scope changes
  }
};

export default $compile;
