// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/home/Home';
import Premieres from '../components/premieres/Premieres';
import Search from '../components/search/Search';
import Popular from '../components/popular/Popular';
import View from '../components/view/View';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/premieres" component={Premieres} />
        <Route path="/search" component={Search} />
        <Route path="/search/:query" component={Search} />
        <Route path="/popular" component={Popular} />
        <Route path="/view/:id" component={View} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
