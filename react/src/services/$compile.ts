// react/src/services/$compile.ts

import { useState, useEffect } from 'react';

interface CompileOptions {
  // Define any options that might be needed for the compile service
}

interface CompileService {
  compile: (template: string, options?: CompileOptions) => JSX.Element;
}

const useCompile = (): CompileService => {
  const compile = (template: string, options?: CompileOptions): JSX.Element => {

    // Create a temporary container to hold the template string
    const container = document.createElement('div');
    container.innerHTML = template;

    // Convert the container's children to JSX elements
    const children = Array.from(container.childNodes).map((node, index) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        const props: any = {};

        // Convert attributes to props
        Array.from(element.attributes).forEach(attr => {
          props[attr.name] = attr.value;
        });

        // Recursively compile child nodes
        const childElements = Array.from(element.childNodes).map((childNode, childIndex) => {
          return compile(childNode.outerHTML, options);
        });

        return React.createElement(tagName, { key: index, ...props }, ...childElements);
      }
      return null;
    });

    return <>{children}</>;
  };
    return <div>{template}</div>;
  };

  return { compile };
};

export default useCompile;
