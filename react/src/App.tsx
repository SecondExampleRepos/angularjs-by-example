import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import SearchController from './components/SearchController';
import PopularController from './components/PopularController';
import ViewController from './components/ViewController';
import { getPremieres, getPopular, getShow } from './services/ShowService';

const AppModule = () => {
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
              <PremieresController {...props} shows={getPremieres()} />
            )}
          />
          <Route path="/search" component={SearchController} />
          <Route path="/search/:searchQuery" component={SearchController} />
          <Route
            path="/popular"
            render={(props) => (
              <PopularController {...props} shows={getPopular()} />
            )}
          />
          <Route
            path="/view/:id"
            render={(props) => (
              <ViewController {...props} show={getShow(props.match.params.id)} />
            )}
          />
          <Route path="*" render={() => <div>404 Not Found</div>} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppModule;
