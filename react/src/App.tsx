import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/controllers/HomeController';
import Premieres from './components/controllers/PremieresController';
import Search from './components/controllers/SearchController';
import Popular from './components/controllers/PopularController';
import View from './components/controllers/ViewController';

// CSS imports
import './assets/sections/home/home.css';
import './assets/sections/premieres/premieres.css';
import './assets/sections/search/search.css';
import './assets/sections/view/view.css';
import './assets/components/show/show.css';
import './assets/assets/css/style.css';
import './assets/assets/css/animations.css';
import './assets/assets/css/font-icons.css';

// Converted from src/app.routes.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premieres" element={<Premieres />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
