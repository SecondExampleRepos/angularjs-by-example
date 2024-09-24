// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomeController from '../components/HomeController';
import PremieresController from '../components/PremieresController';
import SearchController from '../components/SearchController';
import PopularController from '../components/PopularController';
import ViewController from '../components/ViewController';
import ShowService from '../services/ShowService';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeController} />
                <Route
                    path="/premieres"
                    render={() => (
                        <PremieresController shows={ShowService.getPremieres()} />
                    )}
                />
                <Route exact path="/search" component={SearchController} />
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
        </Router>
    );
};

export default AppRoutes;
