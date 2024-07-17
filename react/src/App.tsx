import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import PopularController from './components/PopularController';
import SearchController from './components/SearchController';
import ViewController from './components/ViewController';
import NotFound from './components/NotFound';

function App() {
  const [barData, setBarData] = useState({ title: '', description: '', loading: true });

  useEffect(() => {
    // Fetch bar data
    axios.get('/api/bar')
      .then(response => {
        setBarData({ ...response.data, loading: false });
      })
      .catch(error => {
        console.error('Error fetching bar data:', error);
        setBarData({ ...barData, loading: false });
      });
  }, []);

  return (
    <div className="App">
      <header id="site-header">
        <div className="container">
          <div className="pull-left logo">REACT <span className="alt">BY</span> EXAMPLE</div>
          <ul className="pull-right menu">
            <li><a href="#/">HOME</a></li>
            <li><a href="#/premieres">PREMIERES</a></li>
            <li><a href="#/popular">POPULAR</a></li>
            <li><a href="#/search">SEARCH</a></li>
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
          <Router>
            <Switch>
              <Route exact path="/">
                <HomeController />
              </Route>
              <Route path="/premieres">
                <PremieresController shows={[]} />
              </Route>
              <Route path="/popular">
                <PopularController shows={[]} />
              </Route>
              <Route path="/search">
                <SearchController />
              </Route>
              <Route path="/view/:id">
                <ViewController show={{ id: '', original_name: '' }} />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </div>
      </section>
    </div>
  );
}

export default App;
