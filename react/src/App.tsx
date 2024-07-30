import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchController from './components/SearchController';
import ViewController from './components/ViewController';
import PopularController from './components/PopularController';
import ShowService from './services/ShowService';
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
          <Route exact path="/" component={Home} />
          <Route
            path="/premieres"
            render={(props) => (
              <PremieresController {...props} shows={ShowService.getPremieres()} />
            )}
          />
          <Route exact path="/search" component={SearchController} />
          <Route path="/search/:query" component={SearchController} />
          <Route
            path="/popular"
            render={(props) => (
              <PopularController {...props} shows={ShowService.getPopular()} />
            )}
          />
          <Route
            path="/view/:id"
            render={(props) => (
              <ViewController {...props} show={ShowService.get(props.match.params.id)} />
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>Welcome to the TV Show App!</p>
  </div>
);

const PremieresController = ({ shows }) => (
  <div>
    <h1>Premieres</h1>
    <ul>
      {shows.map((show) => (
        <li key={show.id}>{show.name}</li>
      ))}
    </ul>
  </div>
);

const NotFound = () => (
  <div>
    <h1>404 - Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default App;
