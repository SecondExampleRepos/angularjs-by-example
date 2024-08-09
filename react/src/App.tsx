import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import SearchController from './components/SearchController';
import PopularController from './components/PopularController';
import ViewController from './components/ViewController';
import ShowService from './services/ShowService';

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
            render={() => (
              <PremieresController shows={ShowService.getPremieres()} />
            )}
          />
          <Route path="/search" component={SearchController} />
          <Route path="/search/:query" component={SearchController} />
          <Route
            path="/popular"
            render={() => (
              <PopularController shows={ShowService.getPopular()} />
            )}
          />
          <Route
            path="/view/:id"
            render={({ match }) => (
              <ViewController show={ShowService.get(match.params.id)} />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// SECOND AGENT: [MISSING CONTEXT] - The AngularJS module definition and dependencies need to be converted to React logic. 
// Since the context of what these modules do is missing, further implementation is required once more information is available.
