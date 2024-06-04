// src/components/SomeComponent.tsx

import React from 'react';
import useRootScope from '../hooks/useRootScope';

const SomeComponent: React.FC = () => {
  const { state } = useRootScope();

  return (
    <div>
      {/* Render based on state */}
      {/* Example: <p>{state.someProperty}</p> */}
    </div>
  );
};

export default SomeComponent;