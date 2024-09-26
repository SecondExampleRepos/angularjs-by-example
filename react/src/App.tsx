// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../components/controllers/Home';
import Premieres from '../../components/controllers/Premieres';
import Search from '../../components/controllers/Search';
import Popular from '../../components/controllers/Popular';
import View from '../../components/controllers/View';
import ShowService from '../../services/showService';

// CSS imports
import '../../assets/src/assets/css/font-icons.css';
import '../../assets/src/assets/css/animations.css';
import '../../assets/src/assets/css/style.css';
import '../../assets/src/components/show/show.css';
import '../../assets/src/sections/home/home.css';
import '../../assets/src/sections/premieres/premieres.css';
import '../../assets/src/sections/search/search.css';
import '../../assets/src/sections/view/view.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/premieres"
          element={<Premieres shows={ShowService.getPremieres()} />}
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/search/:query"
          element={<Search query={window.location.pathname.split('/').pop()} />}
        />
        <Route
          path="/popular"
          element={<Popular shows={ShowService.getPopular()} />}
        />
        <Route
          path="/view/:id"
          element={<View show={ShowService.get(window.location.pathname.split('/').pop())} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
