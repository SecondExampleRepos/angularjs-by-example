// react/src/services/$compile.ts

import { useState, useEffect } from 'react';

interface CompileService {
  compile: (template: string, scope: any) => HTMLElement;
}

const useCompile = (): CompileService => {
  const compile = (template: string, scope: any): HTMLElement => {
    const div = document.createElement('div');
    div.innerHTML = template;

    // Bind scope to the template
    Object.keys(scope).forEach(key => {
      const elements = div.querySelectorAll(`[ng-bind="${key}"]`);
      elements.forEach(element => {
        element.textContent = scope[key];
      });
    });

    return div;
  };

  return { compile };
};

export default useCompile;
