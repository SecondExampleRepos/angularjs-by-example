import React from 'react';
import logo from './logo.svg';
import './App.css';

// Importing necessary libraries for React equivalent functionality
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // React equivalent for ngAnimate
import moment from 'moment'; // React equivalent for angularMoment
// Note: angular-preload-image and truncate would need React equivalents or custom implementations

// Importing components
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import SearchController from './components/SearchController';
import PopularController from './components/PopularController';
import ViewController from './components/ViewController';

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
      <Router>
        <AnimatePresence>
          <Switch>
            <Route path="/" exact component={HomeController} />
            <Route path="/premieres" exact component={PremieresController} />
            <Route path="/search" exact component={SearchController} />
            <Route path="/search/:searchQuery" exact component={SearchController} />
            <Route path="/popular" exact component={PopularController} />
            <Route path="/view/:id" exact component={ViewController} />
            {/* Add more routes as needed */}
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
