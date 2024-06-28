import { useState, useEffect } from 'react';

interface CompileService {
  compile: (template: string, scope: any) => HTMLElement;
}

const useCompile = (): CompileService => {
  const compile = (template: string, scope: any): HTMLElement => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;

    // Apply scope to the template
    const applyScope = (element: HTMLElement, scope: any) => {

      const bindData = (el: HTMLElement) => {
        Array.from(el.childNodes).forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const elementNode = node as HTMLElement;
            // Bind text content
            if (elementNode.hasAttribute('data-bind')) {
              const bindKey = elementNode.getAttribute('data-bind');
              if (bindKey && scope[bindKey] !== undefined) {
                elementNode.textContent = scope[bindKey];
              }
            }
            // Recursively bind data to child elements
            bindData(elementNode);
          }
        });
      };

      bindData(element);
    };

    applyScope(tempDiv, scope);

    return tempDiv;
  };

  return {
    compile,
  };
};

export default useCompile;
