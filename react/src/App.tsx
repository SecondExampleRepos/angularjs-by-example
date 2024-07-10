// react/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Services from './routes/Services';
import Portfolio from './routes/Portfolio';
import Blog from './routes/Blog';
import FAQ from './routes/FAQ';
import useRootScope from './hooks/useRootScope';

const App: React.FC = () => {
  // Initialize root scope or any global state here using useRootScope
  const rootScope = useRootScope();

  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/services" component={Services} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/blog" component={Blog} />
        <Route path="/faq" component={FAQ} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
