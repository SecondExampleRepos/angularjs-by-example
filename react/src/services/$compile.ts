// react/src/components/CompiledComponent.tsx

import React from 'react';
import useCompile from '../hooks/useCompile';

interface CompiledComponentProps {
  scope: any;
}

const CompiledComponent: React.FC<CompiledComponentProps> = ({ scope }) => {
  const elementRef = useCompile(scope);

  return <div ref={elementRef}></div>;
};

export default CompiledComponent;
