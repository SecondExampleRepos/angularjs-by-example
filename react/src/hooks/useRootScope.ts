import React from 'react';
import useRootScope from './hooks/useRootScope';

const ExampleComponent: React.FC = () => {
  const { exampleState, setExampleState, exampleFunction } = useRootScope();

  return (
    <div>
      <p>Example State: {exampleState}</p>
      <button onClick={exampleFunction}>Call Example Function</button>
    </div>
  );
};

export default ExampleComponent;