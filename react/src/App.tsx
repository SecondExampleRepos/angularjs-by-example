import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Premieres from './components/Premieres';
import Popular from './components/Popular';
import Search from './components/Search';
import View from './components/View';
import ShowService from './services/ShowService';

function App() {
  const [barData, setBarData] = useState({ title: '', description: '', loading: false });

  useEffect(() => {
    // Fetch bar data here
    fetch('https://api.example.com/bar')
      .then(response => response.json())
      .then(data => {
        setBarData({
          title: data.title,
          description: data.description,
          loading: false
        });
      })
      .catch(error => {
        console.error('Error fetching bar data:', error);
        setBarData(prevState => ({
          ...prevState,
          loading: false
        }));
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <header id="site-header">
          <div className="container">
            <div className="pull-left logo">ANGULARJS <span className="alt">BY</span> EXAMPLE</div>
            <ul className="pull-right menu">
              <li><a href="/">HOME</a></li>
              <li><a href="/premieres">PREMIERES</a></li>
              <li><a href="/popular">POPULAR</a></li>
              <li><a href="/search">SEARCH</a></li>
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
              <Route exact path="/" component={Home} />
              <Route path="/premieres" render={(props) => <Premieres {...props} shows={ShowService.getPremieres()} />} />
              <Route path="/popular" render={(props) => <Popular {...props} shows={ShowService.getPopular()} />} />
              <Route path="/search/:query?" component={Search} />
              <Route path="/view/:id" render={(props) => <View {...props} show={ShowService.get(props.match.params.id)} />} />
              <Route path="*" render={() => <div>404 Not Found</div>} />
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
