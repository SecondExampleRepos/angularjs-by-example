import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/font-icons.css';
import '../../assets/css/animations.css';
import '../../assets/css/style.css';
import '../../sections/home/home.css';
import '../../components/show/show.css';
import '../../sections/view/view.css';
import '../../sections/search/search.css';
import '../../sections/premieres/premieres.css';

const App: React.FC = () => {
  const [barData, setBarData] = useState({ title: '', description: '', loading: false });

  useEffect(() => {
    // Fetch bar data here

    fetch('/api/bar-data')
      .then(response => response.json())
      .then(data => setBarData({ title: data.title, description: data.description, loading: false }))
      .catch(error => {
        console.error('Error fetching bar data:', error);
        setBarData({ title: '', description: '', loading: false });
      });

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
            <h1>{barData.title}</h1>
            <p>{barData.description}</p>
          </div>
          {barData.loading && <div className="page-loader"><div className="throbber"></div></div>}
        </section>

        <section id="main">
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
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

const Home: React.FC = () => {
  return <div>Home Component</div>;
};

const Premieres: React.FC = () => {
  return <div>Premieres Component</div>;
};

const Popular: React.FC = () => {
  return <div>Popular Component</div>;
};

const Search: React.FC = () => {
  return <div>Search Component</div>;
};

const View: React.FC = () => {
  return <div>View Component</div>;
};

export default App;
