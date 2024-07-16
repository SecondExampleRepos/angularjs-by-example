import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Premieres from './components/Premieres';
import Search from './components/Search';
import Popular from './components/Popular';
import View from './components/View';
import ShowService from './services/ShowService';

function App() {
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
        <Route path="/search" component={Search} />
        <Route path="/search/:query" component={Search} />
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
        <Route path="*" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
