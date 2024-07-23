import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import SearchController from './components/SearchController';
import PopularController from './components/PopularController';
import ViewController from './components/ViewController';
import NotFound from './components/NotFound';

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
        <main>
          <AnimatePresence>
            <Switch>
              <Route exact path="/" component={HomeController} />
              <Route
                path="/premieres"
                render={(props) => (
                  <PremieresController {...props} shows={[]} />
                )}
              />
              <Route exact path="/search" component={SearchController} />
              <Route path="/search/:searchQuery" component={SearchController} />
              <Route path="/popular" component={PopularController} />
              <Route
                path="/view/:id"
                render={(props) => (
                  <ViewController
                    {...props}
                    show={{
                      id: parseInt(props.match.params.id, 10),
                      original_name: '',
                      cast: [],
                    }}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
