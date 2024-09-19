// Converted from src/app.routes.js

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../components/controllers/Home';
import Premieres from '../../components/controllers/Premieres';
import Search from '../../components/controllers/Search';
import Popular from '../../components/controllers/Popular';
import View from '../../components/controllers/View';
import ShowService from '../../services/ShowService';

export function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route
                    path="/premieres"
                    render={(props) => (
                        <Premieres {...props} shows={ShowService.getPremieres()} />
                    )}
                />
                <Route exact path="/search" component={Search} />
                <Route
                    path="/search/:query"
                    render={(props) => (
                        <Search {...props} query={props.match.params.query} />
                    )}
                />
                <Route
                    path="/popular"
                    render={(props) => (
                        <Popular {...props} shows={ShowService.getPopular()} />
                    )}
                />
                <Route
                    path="/view/:id"
                    render={(props) => (
                        <View {...props} show={ShowService.get(props.match.params.id)} />
                    )}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}
