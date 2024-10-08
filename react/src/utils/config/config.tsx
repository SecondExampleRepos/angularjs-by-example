// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomeController from '../../components/controllers/HomeController';
import PremieresController from '../../components/controllers/PremieresController';
import SearchController from '../../components/controllers/SearchController';
import PopularController from '../../components/controllers/PopularController';
import ViewController from '../../components/controllers/ViewController';
import ShowService from '../../services/ShowService';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeController} />
        <Route
          path="/premieres"
          render={() => (
            <PremieresController />
          )}
        />
        <Route exact path="/search" component={SearchController} />
        <Route path="/search/:query" component={SearchController} />
        <Route
          path="/popular"
          render={() => (
            <PopularController />
          )}
        />
        <Route
          path="/view/:id"
          render={({ match }) => (
            <ViewController showId={match.params.id} />
          )}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
