import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have a CSS file for styles

const App: React.FC = () => {
  const [barData, setBarData] = useState<{ title: string; description: string; loading: boolean }>({
    title: '',
    description: '',
    loading: true,
  });

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setBarData({
        title: 'Welcome to React by Example',
        description: 'This is a description fetched from an API.',
        loading: false,
      });
    }, 2000);
  }, []);

  return (
    <div>
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
        {barData.loading && (
          <div className="page-loader">
            <div className="throbber"></div>
          </div>
        )}
      </section>

      <section id="main">
        <div className="container">
                    {/* This is where the main content will be rendered */}
                    {/* You can use React Router or any other routing mechanism to render different components based on the URL */}
                    <Router>
                      <Switch>
                        <Route exact path="/">
                          <Home />
                        </Route>
                        <Route path="/premieres">
                          <Premieres />
                        </Route>
                        <Route path="/popular">
                          <Popular />
                        </Route>
                        <Route path="/search">
                          <Search />
                        </Route>
                        {/* Add more routes as needed */}
                      </Switch>
                    </Router>
        </div>
      </section>
    </div>
  );
};

export default App;