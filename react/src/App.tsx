// Converted from src/app.routes.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from '../components/controllers/HomeController.js';
import Premieres from '../components/controllers/PremieresController.js';
import Search from '../components/controllers/SearchController.js';
import Popular from '../components/controllers/PopularController.js';
import View from '../components/controllers/ViewController.js';

// CSS imports
import '../assets/src/assets/css/font-icons.css';
import '../assets/src/assets/css/animations.css';
import '../assets/src/assets/css/style.css';
import '../assets/src/components/show/show.css';
import '../assets/src/sections/home/home.css';
import '../assets/src/sections/premieres/premieres.css';
import '../assets/src/sections/search/search.css';
import '../assets/src/sections/view/view.css';

// Mock ShowService to simulate data fetching
const ShowService = {
  getPremieres: async () => {
    // Simulate fetching premieres data
    return [];
  },
  getPopular: async () => {
    // Simulate fetching popular shows data
    return [];
  },
  get: async (id: number) => {
    // Simulate fetching a show by id
    return { id, original_name: 'Sample Show', cast: [] };
  }
};

function App() {
  const [premieres, setPremieres] = useState([]);
  const [popular, setPopular] = useState([]);
  const [viewShow, setViewShow] = useState({ id: 0, original_name: '', cast: [] });

  useEffect(() => {
    // Fetch premieres and popular shows on component mount
    const fetchShows = async () => {
      const premieresData = await ShowService.getPremieres();
      setPremieres(premieresData);

      const popularData = await ShowService.getPopular();
      setPopular(popularData);
    };

    fetchShows();
  }, []);

  const ViewWrapper = () => {
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
      const fetchShow = async () => {
        if (id) {
          const showData = await ShowService.get(Number(id));
          setViewShow(showData);
        }
      };
      fetchShow();
    }, [id]);

    return <View show={viewShow} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premieres" element={<Premieres shows={premieres} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/popular" element={<Popular shows={popular} />} />
        <Route path="/view/:id" element={<ViewWrapper />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
