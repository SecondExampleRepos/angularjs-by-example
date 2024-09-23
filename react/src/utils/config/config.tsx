// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../components/controllers/home';
import Premieres from '../../components/controllers/premieres';
import Search from '../../components/controllers/search';
import Popular from '../../components/controllers/popular';
import View from '../../components/controllers/view';
import ShowService from '../../services/showService';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/premieres"
          render={() => (
            <Premieres shows={ShowService.getPremieres()} />
          )}
        />
        <Route exact path="/search" component={Search} />
        <Route
          path="/search/:query"
          render={({ match }) => (
            <Search query={match.params.query} />
          )}
        />
        <Route
          path="/popular"
          render={() => (
            <Popular shows={ShowService.getPopular()} />
          )}
        />
        <Route
          path="/view/:id"
          render={({ match }) => (
            <View show={ShowService.get(match.params.id)} />
          )}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
