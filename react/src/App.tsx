import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Placeholder for the Bar component
const Bar = ({ data }) => (
  <section id="site-bar">
    <div className="container">
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
    {data.loading && <div className="page-loader"><div className="throbber"></div></div>}
  </section>
);

function App() {
  const [barData, setBarData] = useState({ title: '', description: '', loading: false });

  useEffect(() => {
    // Simulate fetching data for the Bar component
    setBarData({ title: 'Welcome to React', description: 'This is a description.', loading: false });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Bar data={barData} />
      <section id="main">
        <div className="container">

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
