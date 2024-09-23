// Converted from src/app.routes.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/controllers/HomeController';
import Premieres from './components/controllers/PremieresController';
import Search from './components/controllers/SearchController';
import Popular from './components/controllers/PopularController';
import View from './components/controllers/ViewController';
import ShowService from './services/ShowService';
import PageValues from './utils/constants/PageValues';

// CSS imports
import './assets/src/sections/home/home.css';
import './assets/src/sections/premieres/premieres.css';
import './assets/src/sections/search/search.css';
import './assets/src/sections/view/view.css';
import './assets/src/components/show/show.css';
import './assets/src/assets/css/animations.css';
import './assets/src/assets/css/style.css';
import './assets/src/assets/css/font-icons.css';

function App() {
  const [premieresShows, setPremieresShows] = useState<any[]>([]);
  const [popularShows, setPopularShows] = useState<any[]>([]);
  const [viewShow, setViewShow] = useState<any | null>(null);

  useEffect(() => {
    const fetchPremieres = async () => {
      const shows = await ShowService.getPremieres();
      setPremieresShows(shows);
    };

    const fetchPopular = async () => {
      const shows = await ShowService.getPopular();
      setPopularShows(shows);
    };

    fetchPremieres();
    fetchPopular();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/premieres"
          element={<Premieres shows={premieresShows} />}
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/search/:query"
          element={<Search />}
        />
        <Route
          path="/popular"
          element={<Popular shows={popularShows} pageValues={PageValues} />}
        />
        <Route
          path="/view/:id"
          element={<View show={viewShow} pageValues={PageValues} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
