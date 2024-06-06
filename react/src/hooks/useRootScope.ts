// src/components/SomeComponent.tsx

import React from 'react';
import useRootScope from '../hooks/useRootScope';

const SomeComponent: React.FC = () => {
  const { state, updateState } = useRootScope();

  // Example usage of the state and updateState function
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   updateState({ someValue: event.target.value });
  // };

  return (
    <div>
      {/* Render your component using the state */}
      {/* Example:
      <input type="text" value={state.someValue} onChange={handleChange} />
      */}
    </div>
  );
};

export default SomeComponent;