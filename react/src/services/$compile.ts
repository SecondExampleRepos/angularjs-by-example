import { useState, useEffect } from 'react';

/**
 * Custom hook to replace $compile usage in AngularJS
 */
const useCompile = () => {
  const [compiledTemplate, setCompiledTemplate] = useState<string | null>(null);

  const compileTemplate = (template: string, scope: any) => {

    try {
      // Create a new div element to hold the template
      const container = document.createElement('div');

    // Initialize compiledTemplate with a default value if needed
    setCompiledTemplate(null);
  }, []);

      // Replace AngularJS bindings with React-compatible bindings
      const replaceBindings = (node: HTMLElement) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.attributes).forEach(attr => {
            if (attr.name.startsWith('ng-')) {
              const reactAttr = attr.name.replace('ng-', 'data-');
              node.setAttribute(reactAttr, attr.value);
              node.removeAttribute(attr.name);
            }
          });
        }
        Array.from(node.childNodes).forEach(child => replaceBindings(child as HTMLElement));
      };

      replaceBindings(container);

      // Convert the container's innerHTML to a string and set it as the compiled template
      setCompiledTemplate(container.innerHTML);
    } catch (error) {
      console.error('Error compiling template:', error);
      setCompiledTemplate(null);
    }
  };

  useEffect(() => {

    // Initialize compiledTemplate with a default value if needed
    setCompiledTemplate(null);
  }, []);

  return {
    compiledTemplate,
    compileTemplate,
  };
};

export default useCompile;
