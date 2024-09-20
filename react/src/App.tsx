import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeController from '../../components/controllers/HomeController';
import PremieresController from '../../components/controllers/PremieresController';
import SearchController from '../../components/controllers/SearchController';
import PopularController from '../../components/controllers/PopularController';
import ViewController from '../../components/controllers/ViewController';

// CSS imports
import 'react/src/assets/src/sections/home/home.css';
import 'react/src/assets/src/sections/premieres/premieres.css';
import 'react/src/assets/src/sections/search/search.css';
import 'react/src/assets/src/sections/view/view.css';
import 'react/src/assets/src/components/show/show.css';
import 'react/src/assets/src/assets/css/animations.css';
import 'react/src/assets/src/assets/css/font-icons.css';
import 'react/src/assets/src/assets/css/style.css';

// Converted from src/app.routes.js

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
