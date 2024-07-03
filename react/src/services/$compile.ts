// react/src/services/$compile.ts

import { useEffect, useRef } from 'react';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const $compile: CompileService = {
  compile: (element, scope) => {

    const ref = useRef(null);

    useEffect(() => {
      if (ref.current) {
        // Assuming `scope` is an object with properties that need to be bound to the element
        Object.keys(scope).forEach(key => {
          if (typeof scope[key] === 'function') {
            ref.current[key] = scope[key];
          } else {
            ref.current.setAttribute(key, scope[key]);
          }
        });
      }
    }, [scope]);

    return ref;
  }
};

export default $compile;
