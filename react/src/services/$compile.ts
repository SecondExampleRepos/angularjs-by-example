import { useState, useEffect } from 'react';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const useCompile = (): CompileService => {
  const compile = (element: HTMLElement, scope: any) => {

    // Assuming `scope` is an object containing the data to be bound to the element
    // and `element` is the root element where the compiled content will be inserted.

    // Create a new div element to hold the compiled content
    const container = document.createElement('div');
    container.innerHTML = element.innerHTML;

    // Function to recursively bind data to elements
    const bindData = (el: HTMLElement, data: any) => {
      // Iterate over child nodes
      Array.from(el.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const childElement = child as HTMLElement;

          // Bind text content if the element has a data-binding attribute
          if (childElement.hasAttribute('data-bind')) {
            const bindKey = childElement.getAttribute('data-bind');
            if (bindKey && data[bindKey] !== undefined) {
              childElement.textContent = data[bindKey];
            }
          }

          // Recursively bind data to child elements
          bindData(childElement, data);
        }
      });
    };

    // Bind data to the container element
    bindData(container, scope);

    // Replace the original element's content with the compiled content
    element.innerHTML = container.innerHTML;
  };

  return {
    compile,
  };
};

export default useCompile;