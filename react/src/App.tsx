import React from 'react';
import logo from './logo.svg';
import './App.css';

// Importing necessary libraries for React equivalent functionality
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // React equivalent for ngAnimate
import moment from 'moment'; // React equivalent for angularMoment
// Note: angular-preload-image and truncate would need React equivalents or custom implementations

// Importing components
import HomeController from './components/HomeController';
import PremieresController from './components/PremieresController';
import SearchController from './components/SearchController';
import PopularController from './components/PopularController';
import ViewController from './components/ViewController';
import Show from './components/show';

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
            <Route path="/" exact>
              <HomeController />
            </Route>
            <Route path="/premieres" exact>
              import React, { useEffect, useState } from 'react';
              import { getPremieres } from './services/showsService';
              
              const PremieresControllerWrapper: React.FC = () => {
                const [shows, setShows] = useState<Show[]>([]);
                const [loading, setLoading] = useState<boolean>(true);
              
                useEffect(() => {
                  const fetchPremieres = async () => {
                    try {
                      const premieres = await getPremieres();
                      setShows(premieres);

              <ViewController show={shows.length > 0 ? shows[0] : { id: 0, original_name: '' }} />
            </Route>

              // Fetch and pass the show data
              import React, { useEffect, useState } from 'react';
              import { useParams } from 'react-router-dom';
              import axios from 'axios';
              import API_KEY from './utils/constants/API_KEY';
              import BASE_URL from './utils/constants/BASE_URL';
              import Show from './components/show';
              
              const ShowWrapper: React.FC = () => {
                const { id } = useParams<{ id: string }>();
                const [show, setShow] = useState<{ id: number }>({ id: 0 });
                const [loading, setLoading] = useState<boolean>(true);
              
                useEffect(() => {
                  const fetchShow = async () => {
                    try {
                      const response = await axios.get(`${BASE_URL}/show/${id}?api_key=${API_KEY}`);
                      setShow(response.data);
                    } catch (error) {
                      console.error('Error fetching show:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
              
                  fetchShow();
                }, [id]);
              
                  // ViewControllerWrapper.tsx
                  import React, { useEffect, useState } from 'react';
                  import { useParams } from 'react-router-dom';
                  // ShowWrapper.tsx
                  import React, { useEffect, useState } from 'react';
                  import { useParams } from 'react-router-dom';
                  import axios from 'axios';
                  import Show from './show';
                  import API_KEY from '../utils/constants/API_KEY';
                  import BASE_URL from '../utils/constants/BASE_URL';
                  
                  const ShowWrapper: React.FC = () => {
                    const { id } = useParams<{ id: string }>();
                    const [show, setShow] = useState<{ id: number } | null>(null);
                    const [loading, setLoading] = useState<boolean>(true);
                  
                    useEffect(() => {
                      const fetchShow = async () => {
                        try {
                          const response = await axios.get(`${BASE_URL}/show/${id}?api_key=${API_KEY}`);
                          setShow(response.data);
                        } catch (error) {
                          console.error('Error fetching show:', error);
                        } finally {
                          setLoading(false);
                        }
                      };
                  
                      fetchShow();
                    }, [id]);
                  
                    if (loading) {
                      return <p>Loading...</p>;
                    }
                  
                    if (!show) {
                      return <p>Show not found</p>;
                    }
                  
                    return <Show show={show} />;
                  };
                  
                  export default ShowWrapper;
                  import API_KEY from '../utils/constants/API_KEY';
                  import BASE_URL from '../utils/constants/BASE_URL';
                  
                  interface Show {
                    id: number;
                    original_name: string;
                  }
                  
                  const ViewControllerWrapper: React.FC = () => {
                    const { id } = useParams<{ id: string }>();
                    const [show, setShow] = useState<Show | null>(null);
                    const [loading, setLoading] = useState<boolean>(true);
                  
                    useEffect(() => {
                      const fetchShow = async () => {
                        try {
                          const response = await axios.get(`${BASE_URL}/show/${id}?api_key=${API_KEY}`);
                          setShow(response.data);
                        } catch (error) {
                          console.error('Error fetching show:', error);
                        } finally {
                          setLoading(false);
                        }
                      };
                  
                      fetchShow();
                    }, [id]);
                  
                    if (loading) {
                      return <p>Loading...</p>;
                    }
                  
                    if (!show) {
                      return <p>Show not found</p>;
                    }
                  
                    return <ViewController show={show} />;
                  };
                  
                  export default ViewControllerWrapper;
                }
              
                return <Show show={show} />;
              };
              
              export default ShowWrapper;
                    } finally {
                      setLoading(false);
                    }
                  };
              
                  fetchPremieres();
                }, []);
              
                if (loading) {
                  return <p>Loading...</p>;
                }
              
                return <PremieresController shows={shows} />;
              };
              
              export default PremieresControllerWrapper;
            </Route>
            <Route path="/search" exact>
              <SearchController />
            </Route>
            <Route path="/search/:searchQuery" exact>
              <SearchController />
            </Route>
            <Route path="/popular" exact>
              <PopularController />
            </Route>
            <Route path="/view/:id" exact>
              // ViewControllerWrapper.tsx
              import React, { useEffect, useState } from 'react';
              import ShowWrapper from './components/ShowWrapper';
              import API_KEY from './utils/constants/API_KEY';
              import BASE_URL from './utils/constants/BASE_URL';
              
              interface Show {
                id: number;
                original_name: string;
              }
              
              const ViewControllerWrapper: React.FC = () => {
                const { id } = useParams<{ id: string }>();
                const [show, setShow] = useState<Show | null>(null);
                const [loading, setLoading] = useState<boolean>(true);
              
                useEffect(() => {
                  const fetchShow = async () => {
                    try {
                      const response = await axios.get(`${BASE_URL}/show/${id}?api_key=${API_KEY}`);
                      setShow(response.data);
                    } catch (error) {
                      console.error('Error fetching show:', error);
                    } finally {
                      setLoading(false);
                    }
                  };
              
                  fetchShow();
                }, [id]);
              
                if (loading) {
                  return <p>Loading...</p>;
                }
              
                if (!show) {
                  return <p>Show not found</p>;
                }
              
                return <ViewController show={show} />;
              };
              
              export default ViewControllerWrapper;
            </Route>
            <Route path="/show/:id" exact>

              <ShowWrapper />
            </Route>
            {/* Add more routes as needed */}
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
