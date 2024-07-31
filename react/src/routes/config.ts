import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeController from '../components/HomeController';
import PremieresController from '../components/PremieresController';
import SearchController from '../components/SearchController';
import PopularController from '../components/PopularController';
import ViewController from '../components/ViewController';
import ShowService from '../services/ShowService';
import React from 'react';

const config = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeController} />
        <Route
          path="/premieres"
          render={(props) => (
            <PremieresController
              {...props}
              shows={async () => await ShowService.getPremieres()}
            />
          )}
        />
        <Route exact path="/search" component={SearchController} />
        <Route path="/search/:query" component={SearchController} />
        <Route
          path="/popular"
          render={(props) => (
            <PopularController
              {...props}
              shows={async () => await ShowService.getPopular()}
            />
          )}
        />
        <Route
          path="/view/:id"
          render={(props) => (
            <ViewController
              {...props}
              show={async () => await ShowService.get(props.match.params.id)}
            />
          )}
        />
        <Route path="*" component={HomeController} />
      </Switch>
    </Router>
  );
};

export default config;
