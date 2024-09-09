// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import Premieres from '../components/Premieres';
import Search from '../components/Search';
import Popular from '../components/Popular';
import View from '../components/View';
import { getPremieres, getPopular, getShow } from '../services/ShowService';

const RoutesConfig: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route 
                    path="/premieres" 
                    render={() => (
                        <Premieres shows={getPremieres()} />
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
                        <Popular shows={getPopular()} />
                    )}
                />
                <Route 
                    path="/view/:id" 
                    render={({ match }) => (
                        <View show={getShow(match.params.id)} />
                    )}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default RoutesConfig;
