// react/src/services/$compile.ts

import { useState, useEffect } from 'react';
import { useRootScope } from '../hooks/useRootScope';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const useCompile = (): CompileService => {
  const { state: rootScope } = useRootScope();

  const compile = (element: HTMLElement, scope: any) => {
import ReactDOM from 'react-dom';

const compile = (element: HTMLElement, scope: any) => {
  // Create a new React component that wraps the element
  const WrapperComponent = () => {
    const [state, setState] = useState(scope);

    useEffect(() => {
      setState(scope);
    }, [scope]);

    return <div ref={(node) => node && node.appendChild(element)} />;
  };

  // Render the React component into the element
  ReactDOM.render(<WrapperComponent />, element);
};
  };

  return {
    compile,
  };
};

export default useCompile;