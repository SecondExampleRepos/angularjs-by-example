import React from 'react';
import logo from './logo.svg';
import './App.css';

// Placeholder for future services and constants
// SECOND AGENT: [MISSING CONTEXT] - Services and constants need to be imported here based on the AngularJS app dependencies

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// React Router configuration to replace AngularJS routes
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Premieres from './components/Premieres';
import Search from './components/Search';
import Popular from './components/Popular';
import View from './components/View';

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/premieres" component={Premieres} />
        <Route path="/search/:query?" component={Search} />
        <Route path="/popular" component={Popular} />
        <Route path="/view/:id" component={View} />
        <Route path="*" component={Home} />
      </Switch>
    </Router>
  );
}

export default AppRoutes;
