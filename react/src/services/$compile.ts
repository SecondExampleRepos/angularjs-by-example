import { useState, useEffect } from 'react';

interface CompileService {
  compile: (template: string, scope: any) => HTMLElement;
}

const useCompileService = (): CompileService => {
  const compile = (template: string, scope: any): HTMLElement => {
    const templateElement = document.createElement('div');
    templateElement.innerHTML = template;

    // Apply scope to the template
    Object.keys(scope).forEach(key => {
      const value = scope[key];
      templateElement.querySelectorAll(`[ng-bind="${key}"]`).forEach(element => {
        element.textContent = value;
      });
    });

    return templateElement;
  };

  return {
    compile,
  };
};

export default useCompileService;