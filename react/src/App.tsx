import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useRootScope from './hooks/useRootScope';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
// Import other routes as needed

const App: React.FC = () => {
  const { state, updateState } = useRootScope();

  // Add any initialization logic here
  // Example:
  // useEffect(() => {
  //   fetchInitialData().then(data => updateState({ someProperty: data }));
  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
};

export default App;