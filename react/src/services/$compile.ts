// react/src/services/$compile.ts

import { useEffect, useRef } from 'react';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const $compile: CompileService = {
  compile: (element, scope) => {

    const ref = useRef(element);

    useEffect(() => {
      const updateElement = () => {
        // Clear the element's content
        while (ref.current.firstChild) {
          ref.current.removeChild(ref.current.firstChild);
        }

        // Create a new element with the updated scope
        const newElement = document.createElement('div');
        newElement.innerHTML = scope.template;
        ref.current.appendChild(newElement);

        // Apply any additional scope properties to the new element
        Object.keys(scope).forEach(key => {
          if (key !== 'template') {
            newElement.setAttribute(key, scope[key]);
          }
        });
      };

      // Initial update
      updateElement();

      // Watch for changes in the scope and update the element accordingly
      const observer = new MutationObserver(updateElement);
      observer.observe(ref.current, { attributes: true, childList: true, subtree: true });

      // Cleanup observer on component unmount
      return () => observer.disconnect();
    }, [scope]);

    return ref.current;
  }
};

export default $compile;
