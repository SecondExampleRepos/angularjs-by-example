// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeController from '../components/controllers/HomeController.tsx';
import PremieresController from '../components/controllers/PremieresController.tsx';
import SearchController from '../components/controllers/SearchController.tsx';
import PopularController from '../components/controllers/PopularController.tsx';
import ViewController from '../components/controllers/ViewController.tsx';

// CSS imports
import '../assets/src/sections/home/home.css';
import '../assets/src/sections/premieres/premieres.css';
import '../assets/src/sections/search/search.css';
import '../assets/src/sections/view/view.css';
import '../assets/src/components/show/show.css';
import '../assets/src/assets/css/font-icons.css';
import '../assets/src/assets/css/style.css';
import '../assets/src/assets/css/animations.css';

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
