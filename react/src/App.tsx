import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Placeholder for BarController logic
const useBarController = () => {
  const [data, setData] = useState({ title: '', description: '', loading: false });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('/api/bar-data'); // Assuming the API endpoint is /api/bar-data
        const result = await response.json();
        setData({
          title: result.title,
          description: result.description,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching bar data:', error);
        setData((prevData) => ({ ...prevData, loading: false }));
      }
    };

    setData((prevData) => ({ ...prevData, loading: true }));
    fetchData();
  }, []);

  return data;
};

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the Home page!</p>
  </div>
);

const Premieres = ({ shows }) => (
  <div>
    <h2>Premieres</h2>
    <ul>
      {shows.map(show => (
        <li key={show.id}>{show.name}</li>
      ))}
    </ul>
  </div>
);

const Popular = ({ shows }) => (
  <div>
    <h2>Popular</h2>
    <ul>
      {shows.map(show => (
        <li key={show.id}>{show.name}</li>
      ))}
    </ul>
  </div>
);

const Search = ({ query }) => (
  <div>
    <h2>Search</h2>
    <p>Search results for: {query}</p>
  </div>
);

const View = ({ show }) => (
  <div>
    <h2>{show.name}</h2>
    <p>{show.description}</p>
  </div>
);

const App = () => {
  const bar = useBarController();

  return (
    <Router>
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
            <h1>{bar.title}</h1>
            <p>{bar.description}</p>
          </div>
          {bar.loading && <div className="page-loader"><div className="throbber"></div></div>}
        </section>
        <section id="main">
          <div className="container">
            <Switch>
              <Route path="/premieres" render={() => {
                const [shows, setShows] = useState([]);
              <Route path="/popular" render={() => {
                    const [shows, setShows] = useState([]);
                    useEffect(() => {
                      const fetchPopularShows = async () => {
                        try {
                          const response = await fetch('/api/popular-shows'); // Assuming the API endpoint is /api/popular-shows
                          const result = await response.json();
                          setShows(result);
                        } catch (error) {
                          console.error('Error fetching popular shows:', error);
                        }
                      };
                      fetchPopularShows();
                    }, []);
                    return <Popular shows={shows} />;
                  }} />
                useEffect(() => {
                  const fetchPremieres = async () => {
                    try {
                      const response = await fetch('/api/premieres'); // Assuming the API endpoint is /api/premieres
                      const result = await response.json();
                      setShows(result);
                    } catch (error) {
                      console.error('Error fetching premieres shows:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
              
                  fetchPremieres();
                }, []);
              
                if (loading) {
                  return <div>Loading...</div>;
                }
              
                return <Premieres shows={shows} />;
              }} />
               <Route path="/popular" render={() => {
                 const [shows, setShows] = useState([]);
                 const [loading, setLoading] = useState(true);

                 useEffect(() => {
                   const fetchPopularShows = async () => {
                     try {
                       const response = await fetch('/api/popular-shows'); // Assuming the API endpoint is /api/popular-shows
                       const result = await response.json();
                       setShows(result);
                     } catch (error) {
                       console.error('Error fetching popular shows:', error);
                     } finally {
                       setLoading(false);
                     }
                   };
                   fetchPopularShows();
                 }, []);

                 if (loading) {
                   return <div>Loading...</div>;
                 }

                 return <Popular shows={shows} />;
               }} />
              <Route path="/search/:query" render={({ match }) => <Search query={match.params.query} />} />
              <Route path="/view/:id" render={({ match }) => <View show={{}} />} /> {/* SECOND AGENT: [MISSING CONTEXT] - Fetch show data by ID */}
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;
