import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import Portfolio from './Portfolio';
import Blog from './Blog';
import useRootScope from './hooks/useRootScope';

const App: React.FC = () => {
  const { rootScope, setRootScope, someFunction, anotherFunction } = useRootScope();

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