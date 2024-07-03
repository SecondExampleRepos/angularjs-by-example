import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useRootScope from './hooks/useRootScope';
import RootRouter from './routes/RootRouter';

const App: React.FC = () => {
  const { exampleState, setExampleState, exampleFunction } = useRootScope();

  return (
    <div>
      <Router>
        <RootRouter />
      </Router>
    </div>
  );
};

export default App;
