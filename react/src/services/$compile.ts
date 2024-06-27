// react/src/services/$compile.ts

import { useState, useEffect } from 'react';

// Placeholder for the $compile service conversion from AngularJS to React


import { useState, useEffect, useRef } from 'react';

interface CompileService {
  compile: (template: string, scope: any) => HTMLElement;
}

const useCompile = (): CompileService => {
  const compile = (template: string, scope: any): HTMLElement => {
    const container = document.createElement('div');
    container.innerHTML = template;

    // Apply scope to the template
    Object.keys(scope).forEach(key => {
      const elements = container.querySelectorAll(`[data-bind=${key}]`);
      elements.forEach(element => {
        element.textContent = scope[key];
      });
    });

    return container;
  };

  return { compile };
};

export default useCompile;
