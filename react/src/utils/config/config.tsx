// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../components/controllers/Home';
import Premieres from '../../components/controllers/Premieres';
import Search from '../../components/controllers/Search';
import Popular from '../../components/controllers/Popular';
import View from '../../components/controllers/View';
import ShowService from '../../services/ShowService';

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
