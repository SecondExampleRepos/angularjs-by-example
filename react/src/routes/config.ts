import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeController from '../components/HomeController';
import PremieresController from '../components/PremieresController';
import SearchController from '../components/SearchController';
import PopularController from '../components/PopularController';
import ViewController from '../components/ViewController';
import ShowService from '../services/ShowService';

const config = () => {
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
                <Route 
                    path="/search/:query" 
                    render={(props) => (
                        <SearchController {...props} />
                    )}
                />
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
                <Route path="*" render={() => <div>404 Not Found</div>} />
            </Switch>
        </Router>
    );
};

export default config;
