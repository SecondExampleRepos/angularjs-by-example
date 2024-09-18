// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/home';
import Premieres from '../components/premieres';
import Search from '../components/search';
import Popular from '../components/popular';
import View from '../components/view';

const AppRoutes: React.FC = () => {
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
};

export default AppRoutes;
