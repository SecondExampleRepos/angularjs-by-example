// react/src/services/$compile.ts

import { useState, useEffect } from 'react';

interface CompileService {
  compile: (element: HTMLElement, scope: any) => void;
}

const useCompile = (): CompileService => {
  const compile = (element: HTMLElement, scope: any) => {
import ReactDOM from 'react-dom';

const compile = (element: HTMLElement, scope: any) => {
  // Create a React component that wraps the element
  const WrapperComponent = () => {
    const [state, setState] = useState(scope);

    useEffect(() => {
      // Update state when scope changes
      setState(scope);
    }, [scope]);

    return (
      <div ref={(node) => node && node.appendChild(element)}>
        {/* Render the element inside the wrapper */}
      </div>
    );
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