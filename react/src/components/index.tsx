import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './sections/home/home';
import Premieres from './sections/premieres/premieres';
import Popular from './sections/popular/popular';
import Search from './sections/search/search';
import View from './sections/view/view';
import BarController from './components/bar/bar.ctrl';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header id="site-header">
          <div className="container">
            <div className="pull-left logo">ANGULARJS <span className="alt">BY</span> EXAMPLE</div>
            <ul className="pull-right menu">
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/premieres">PREMIERES</Link></li>
              <li><Link to="/popular">POPULAR</Link></li>
              <li><Link to="/search">SEARCH</Link></li>
            </ul>
          </div>
        </header>

        <section id="site-bar">
          <div className="container">
            <BarController />
          </div>
        </section>

        <section id="main">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/premieres" component={Premieres} />
              <Route path="/popular" component={Popular} />
              <Route path="/search" component={Search} />
              <Route path="/view" component={View} />
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;