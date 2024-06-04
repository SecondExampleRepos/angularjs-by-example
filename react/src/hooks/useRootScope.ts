// src/components/SomeComponent.tsx

import React from 'react';
import useRootScope from '../hooks/useRootScope';

const SomeComponent: React.FC = () => {
  const { state, updateState } = useRootScope();

  // Example usage of the state and updateState function
  const handleClick = () => {
    updateState({ /* someProperty: 'newValue' */ });
  };

  return (
    <div>
      {/* Render something based on the state */}
      <button onClick={handleClick}>Update State</button>
    </div>
  );
};

export default SomeComponent;