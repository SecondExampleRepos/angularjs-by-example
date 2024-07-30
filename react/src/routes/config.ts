import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeController from '../components/HomeController';
import ViewController from '../components/ViewController';
import SearchController from '../components/SearchController';
import Show from '../components/show';
import ShowService from '../services/ShowService';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomeController} />
                <Route 
                    path="/premieres" 
                    render={(props) => (
                        <PremieresController {...props} shows={ShowService.getPremieres()} />
                    )}
                />
                <Route exact path="/search" component={SearchController} />
                <Route path="/search/:query" component={SearchController} />
                <Route 
                    path="/popular" 
                    render={(props) => (
                        <PopularController {...props} shows={ShowService.getPopular()} />
                    )}
                />
                <Route 
                    path="/view/:id" 
                    render={(props) => (
                        <ViewController {...props} show={ShowService.get(props.match.params.id)} />
                    )}
                />
                <Route component={HomeController} />
            </Switch>
        </Router>
    );
};

export default Routes;
