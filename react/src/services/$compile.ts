// react/src/services/$compile.ts

import { useState, useEffect } from 'react';
import { useRootScope } from '../hooks/useRootScope';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const useCompile = (): CompileService => {
  const { state: rootScope, updateState: updateRootScope } = useRootScope();

  const compile = (element: HTMLElement, scope: any) => {

    // Assuming `scope` is an object containing the data to be bound to the element
    // and `element` is the root element where the compiled content will be inserted.

    // Clear the existing content of the element
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    // Create a new div to hold the compiled content
    const container = document.createElement('div');

    // Assuming `scope.template` contains the HTML template as a string
    if (scope.template) {
      container.innerHTML = scope.template;
    }

    // Assuming `scope.data` contains the data to be bound to the template
    const data = scope.data || {};

    // Function to bind data to the template
    const bindData = (element: HTMLElement, data: any) => {
      const bindableElements = element.querySelectorAll('[data-bind]');
      bindableElements.forEach((bindableElement) => {
        const bindKey = bindableElement.getAttribute('data-bind');
        if (bindKey && data[bindKey] !== undefined) {
          bindableElement.textContent = data[bindKey];
        }
      });
    };

    // Bind data to the template
    bindData(container, data);

    // Append the compiled content to the original element
    element.appendChild(container);
  };

  return {
    compile,
  };
};

export default useCompile;