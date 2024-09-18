import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeController from './components/controllers/HomeController';
import PremieresController from './components/controllers/PremieresController';
import SearchController from './components/controllers/SearchController';
import PopularController from './components/controllers/PopularController';
import ViewController from './components/controllers/ViewController';

// CSS imports
import './App.css';
import './index.css';
import './sections/home/home.css';
import './sections/premieres/premieres.css';
import './sections/search/search.css';
import './sections/view/view.css';
import './components/show/show.css';
import './assets/css/animations.css';
import './assets/css/font-icons.css';
import './assets/css/style.css';

// Converted from src/app.routes.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeController />} />
        <Route path="/premieres" element={<PremieresController />} />
        <Route path="/search/:query?" element={<SearchController />} />
        <Route path="/popular" element={<PopularController />} />
        <Route path="/view/:id" element={<ViewController />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
