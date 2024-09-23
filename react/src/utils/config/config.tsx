// Converted from src/app.routes.js

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
                <Route path="/premieres" component={Premieres} />
                <Route path="/search" component={Search} />
                <Route path="/search/:query" component={Search} />
                <Route path="/popular" component={Popular} />
                <Route path="/view/:id" component={View} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}
