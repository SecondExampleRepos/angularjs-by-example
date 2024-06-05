import React from 'react';
import { useRootScope } from './useRootScope';

const ExampleComponent: React.FC = () => {
  const { state } = useRootScope();

  return (
    <div>
      {/* Render based on the state */}
      {/* Example:
      {state.isAuthenticated ? (
        <p>Welcome, {state.user?.name}</p>
      ) : (
        <p>Please log in.</p>
      )}
      */}
    </div>
  );
};

export default ExampleComponent;