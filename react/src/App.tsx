// Converted from src/app.routes.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/controllers/HomeController';
import Premieres from './components/controllers/PremieresController';
import Search from './components/controllers/SearchController';
import Popular from './components/controllers/PopularController';
import View from './components/controllers/ViewController';
import ShowService from './services/ShowService';

// CSS imports
import './assets/src/assets/css/font-icons.css';
import './assets/src/assets/css/animations.css';
import './assets/src/assets/css/style.css';
import './assets/src/components/show/show.css';
import './assets/src/sections/home/home.css';
import './assets/src/sections/premieres/premieres.css';
import './assets/src/sections/search/search.css';
import './assets/src/sections/view/view.css';

function App() {
  const [premieresShows, setPremieresShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [viewShow, setViewShow] = useState(null);
  const showService = ShowService(); // Ensure ShowService is instantiated correctly

  useEffect(() => {
    const fetchPremieres = async () => {
      const shows = await showService.getPremieres();
      setPremieresShows(shows);
    };

    const fetchPopular = async () => {
      const shows = await showService.getPopular();
      setPopularShows(shows);
    };

    const fetchViewShow = async (id: number) => {
      const show = await showService.get(id);
      setViewShow(show);
    };

    fetchPremieres();
    fetchPopular();

    const pathParts = window.location.pathname.split('/');
    if (pathParts[1] === 'view' && pathParts[2]) {
      fetchViewShow(Number(pathParts[2]));
    }
  }, [showService]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/premieres"
          element={
            <Premieres
              shows={premieresShows}
            />
          }
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/search/:query"
          element={
            <Search
              query={window.location.pathname.split('/').pop() || ''}
            />
          }
        />
        <Route
          path="/popular"
          element={
            <Popular
              shows={popularShows}
            />
          }
        />
        <Route
          path="/view/:id"
          element={
            <View
              show={viewShow}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
