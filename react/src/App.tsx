// Converted from src/app.routes.js

import React, { useState, useEffect } from 'react';
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
  const [premiereShows, setPremiereShows] = useState<any[]>([]);
  const [popularShows, setPopularShows] = useState<any[]>([]);
  const [currentShow, setCurrentShow] = useState<any>(null);

  useEffect(() => {
    const fetchPremieres = async () => {
      const shows = await ShowService.getPremieres();
      setPremiereShows(shows);
    };

    const fetchPopular = async () => {
      const shows = await ShowService.getPopular();
      setPopularShows(shows);
    };

    fetchPremieres();
    fetchPopular();
  }, []);

  const setPageValues = (title: string, description: string) => {
    document.title = title;
    // Assuming PageValues is a global object or a context that sets page metadata
    // PageValues.description = description;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premieres" element={<Premieres shows={premiereShows} />} />
        <Route path="/search/:query?" element={<Search />} />
        <Route path="/popular" element={<Popular shows={popularShows} setPageValues={setPageValues} />} />
        <Route path="/view/:id" element={<View show={currentShow} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
