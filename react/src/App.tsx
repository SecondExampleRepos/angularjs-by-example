// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../components/controllers/HomeController';
import Premieres from '../../components/controllers/PremieresController';
import Search from '../../components/controllers/SearchController';
import Popular from '../../components/controllers/PopularController';
import View from '../../components/controllers/ViewController';

// CSS imports
import 'react/src/assets/show.css';
import 'react/src/assets/home.css';
import 'react/src/assets/animations.css';
import 'react/src/assets/search.css';
import 'react/src/assets/App.css';
import 'react/src/assets/index.css';
import 'react/src/assets/font-icons.css';
import 'react/src/assets/premieres.css';
import 'react/src/assets/style.css';
import 'react/src/assets/view.css';

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
