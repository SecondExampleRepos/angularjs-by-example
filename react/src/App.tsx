import React from 'react';
import logo from './logo.svg';
import './App.css';

// Importing necessary libraries for React equivalent functionality
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // React equivalent for ngAnimate
import moment from 'moment'; // React equivalent for angularMoment
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import SearchController from './components/SearchController';
import PopularController from './components/PopularController';
import ViewController from './components/ViewController';

function App() {
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
      <Router>
        <AnimatePresence>
          <Switch>
            <Route path="/" exact component={HomeController} />
            <Route path="/premieres" exact>
              <PremieresController shows={await (async () => {
                try {
                  const response = await axios.get(`${BASE_URL}/premieres`, {
                    params: {
                      api_key: API_KEY,

              // Fetch and pass the popular shows data
              import React, { useEffect, useState } from 'react';
              import axios from 'axios';
              import API_KEY from '../utils/constants/API_KEY';
              import BASE_URL from '../utils/constants/BASE_URL';
              
              const PopularControllerWrapper: React.FC = () => {
                const [shows, setShows] = useState([]);
                const [loading, setLoading] = useState(true);
              
                useEffect(() => {
                  const fetchPopularShows = async () => {
                    try {
                      const response = await axios.get(`${BASE_URL}/popular`, {
                        params: {
                          api_key: API_KEY,
                        },
                      });
                      setShows(response.data.results);
                    } catch (error) {
                      console.error('Error fetching popular shows data:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
              
                  fetchPopularShows();
                }, []);
              
                if (loading) {
                  return <p>Loading...</p>;
                }
              
                return <PopularController shows={shows} />;
              };

              <PopularController shows={await (async () => {
                try {
              <Route path="/view/:id" exact render={({ match }) => {
                const showId = match.params.id;
                const [show, setShow] = useState({ id: 0, original_name: '', cast: [] });
                const [loading, setLoading] = useState(true);
              
                useEffect(() => {
                  const fetchShow = async () => {
                    try {
                      const response = await axios.get(`${BASE_URL}/show/${showId}?api_key=${API_KEY}`);
                      setShow(response.data);
                    } catch (error) {
                      console.error('Error fetching show data:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
              
                  fetchShow();
                }, [showId]);
              
                if (loading) {
                  return <p>Loading...</p>;
                }
              
                return <ViewController show={show} />;
              }} />
                      api_key: API_KEY,
                    },
                  });
                  return response.data.results;
                } catch (error) {
                  console.error('Error fetching popular shows data:', error);
                  return [];
                }
              })()} />
            </Route>
              <Route path="/popular" exact component={PopularControllerWrapper} />
            </Route>
                  <Route path="/view/:id" exact render={({ match }) => {
                    const showId = match.params.id;
                    const [show, setShow] = useState({ id: 0, original_name: '', cast: [] });
                    const [loading, setLoading] = useState(true);
                  
                    useEffect(() => {
                      const fetchShow = async () => {
                        try {
                          const response = await axios.get(`${BASE_URL}/show/${showId}?api_key=${API_KEY}`);
                          setShow(response.data);
                        } catch (error) {
                          console.error('Error fetching show data:', error);
                        } finally {
                          setLoading(false);
                        }
                      };
                  
                      fetchShow();
                    }, [showId]);
                  
                    if (loading) {
                      return <p>Loading...</p>;
                    }
                  
                    return <ViewController show={show} />;
                  }} />
                  console.error('Error fetching premieres shows data:', error);
                  return [];
                }
              })()} />
            <Route path="/search" exact component={SearchController} />
            <Route path="/search/:searchQuery" exact component={SearchController} />
            <Route path="/popular" exact>

              <PopularControllerWrapper />
            </Route>
            <Route path="/view/:id" exact render={({ match }) => {
              const showId = match.params.id;
              const [show, setShow] = useState({ id: 0, original_name: '', cast: [] });
              const [loading, setLoading] = useState(true);
            
              useEffect(() => {
                const fetchShow = async () => {
                  try {
                    const response = await axios.get(`${BASE_URL}/show/${showId}?api_key=${API_KEY}`);
                    setShow(response.data);
                  } catch (error) {
                    console.error('Error fetching show data:', error);
                  } finally {
                    setLoading(false);
                  }
                };
            
                fetchShow();
              }, [showId]);
            
              if (loading) {
                return <p>Loading...</p>;
              }
            
              return <ViewController show={show} />;
            }} />
              <Route path="/view/:id" exact render={({ match }) => {
                const showId = match.params.id;
                const [show, setShow] = useState({ id: 0, original_name: '', cast: [] });
                const [loading, setLoading] = useState(true);

                useEffect(() => {
                  const fetchShow = async () => {
                    try {
                      const response = await axios.get(`${BASE_URL}/show/${showId}?api_key=${API_KEY}`);
                      setShow(response.data);
                    } catch (error) {
                      console.error('Error fetching show data:', error);
                    } finally {
                      setLoading(false);
                    }
                  };

                  fetchShow();
                }, [showId]);

                if (loading) {
                  return <p>Loading...</p>;
                }

                return <ViewController show={show} />;
              }} />
            {/* Add more routes as needed */}
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
