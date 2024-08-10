// Converted from src/app.routes.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeController from '../components/HomeController';
import PremieresController from '../components/PremieresController';
import SearchController from '../components/SearchController';
import PopularController from '../components/PopularController';
import ViewController from '../components/ViewController';
import ShowService from '../services/ShowService';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeController} />
      <Route
        path="/premieres"
        render={async (props) => {
          const shows = await ShowService.getPremieres();
          return <PremieresController {...props} shows={shows} />;
        }}
      />
      <Route exact path="/search" component={SearchController} />
      <Route path="/search/:query" component={SearchController} />
      <Route
        path="/popular"
        render={async (props) => {
          const shows = await ShowService.getPopular();
          return <PopularController {...props} shows={shows} />;
        }}
      />
      <Route
        path="/view/:id"
        render={async (props) => {
          const show = await ShowService.get(props.match.params.id);
          return <ViewController {...props} show={show} />;
        }}
      />
    </Switch>
  );
};

export default Routes;
