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
import './assets/src/sections/home/home.css';
import './assets/src/sections/premieres/premieres.css';
import './assets/src/sections/search/search.css';
import './assets/src/sections/view/view.css';
import './assets/src/components/show/show.css';
import './assets/src/assets/css/style.css';
import './assets/src/assets/css/font-icons.css';
import './assets/src/assets/css/animations.css';

function App() {
  const [premieresShows, setPremieresShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [viewShow, setViewShow] = useState(null);

  useEffect(() => {
    // Fetch premieres shows
    ShowService.getPremieres().then(setPremieresShows);

    // Fetch popular shows
    ShowService.getPopular().then(setPopularShows);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premieres" element={<Premieres shows={premieresShows} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/popular" element={<Popular shows={popularShows} />} />
        <Route path="/view/:id" element={<View show={viewShow} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
