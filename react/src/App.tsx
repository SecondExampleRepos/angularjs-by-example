import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import SearchController from './components/SearchController';
import PopularController from './components/PopularController';
import ViewController from './components/ViewController';
import './App.css';

function App() {
  return (
    <Router>
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
        <Switch>
          <Route exact path="/" component={HomeController} />
          <Route
            path="/premieres"
            render={(props) => (
              <PremieresController {...props} shows={[]} />
            )}
          />
          <Route path="/search/:searchQuery?" component={SearchController} />
          <Route
            path="/popular"
            render={(props) => (
              <PopularController {...props} shows={[]} />
            )}
          />
          <Route
            path="/view/:id"
            render={(props) => (
              <ViewController {...props} show={{ id: 0, original_name: '' }} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
