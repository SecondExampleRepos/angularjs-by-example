﻿// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeController from './components/controllers/HomeController';
import PremieresController from './components/controllers/PremieresController';
import SearchController from './components/controllers/SearchController';
import PopularController from './components/controllers/PopularController';
import ViewController from './components/controllers/ViewController';

// CSS imports
import '../assets/show.css';
import '../assets/home.css';
import '../assets/search.css';
import '../assets/premieres.css';
import '../assets/view.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeController />} />
        <Route path="/premieres" element={<PremieresController />} />
        <Route path="/search" element={<SearchController />} />
        <Route path="/search/:query" element={<SearchController />} />
        <Route path="/popular" element={<PopularController />} />
        <Route path="/view/:id" element={<ViewController />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
