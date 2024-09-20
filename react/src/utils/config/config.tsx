// Converted from src/app.routes.js

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomeController from '../../components/controllers/HomeController';
import PremieresController from '../../components/controllers/PremieresController';
import SearchController from '../../components/controllers/SearchController';
import PopularController from '../../components/controllers/PopularController';
import ViewController from '../../components/controllers/ViewController';

export default function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeController} />
                <Route 
                    path="/premieres" 
                    render={(props) => (
                        <PremieresController {...props} />
                    )}
                />
                <Route 
                    exact 
                    path="/search" 
                    component={SearchController} 
                />
                <Route 
                    path="/search/:query" 
                    render={(props) => (
                        <SearchController {...props} />
                    )}
                />
                <Route 
                    path="/popular" 
                    render={(props) => (
                        <PopularController {...props} />
                    )}
                />
                <Route 
                    path="/view/:id" 
                    render={(props) => (
                        <ViewController {...props} />
                    )}
                />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}
