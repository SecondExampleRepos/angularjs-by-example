// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../components/controllers/HomeController';
import Premieres from '../../components/controllers/PremieresController';
import Search from '../../components/controllers/SearchController';
import Popular from '../../components/controllers/PopularController';
import View from '../../components/controllers/ViewController';

export default function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route 
                    path="/premieres" 
                    render={(props) => (
                        <Premieres {...props} />
                    )}
                />
                <Route exact path="/search" component={Search} />
                <Route 
                    path="/search/:query" 
                    render={(props) => (
                        <Search {...props} />
                    )}
                />
                <Route 
                    path="/popular" 
                    render={(props) => (
                        <Popular {...props} />
                    )}
                />
                <Route 
                    path="/view/:id" 
                    render={(props) => (
                        <View {...props} />
                    )}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}
