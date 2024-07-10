// react/src/services/$compile.ts

import { useState, useEffect } from 'react';

interface CompileService {
  compile: (template: string, scope: any) => HTMLElement;
}

const useCompile = (): CompileService => {
  const compile = (template: string, scope: any): HTMLElement => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template;

    Object.keys(scope).forEach(key => {
      tempDiv.querySelectorAll(`[ng-bind="${key}"]`).forEach(element => {
        element.textContent = scope[key];
      });
    });

    return tempDiv;
  };

  return { compile };
};

export default useCompile;
