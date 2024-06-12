// react/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useRootScope from './hooks/useRootScope';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Services from './routes/Services';
import Portfolio from './routes/Portfolio';
import Blog from './routes/Blog';

const App: React.FC = () => {
  const { exampleState, setExampleState, exampleFunction } = useRootScope();

  // Assuming there was some initialization logic in $rootScope
  // For example, setting an initial state or subscribing to an event
  React.useEffect(() => {
    const initialize = () => {
      // Implement the function logic that was in $rootScope
      console.log('exampleFunction called');
      // Add any additional logic that was previously in $rootScope
    };

    setExampleState('initial value');
    initialize();

    // Cleanup function if needed
    return () => {
      // Example cleanup logic
    };
  }, [setExampleState]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </Router>
  );
};

export default App;