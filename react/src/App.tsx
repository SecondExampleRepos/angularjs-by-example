// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../components/controllers/home';
import Premieres from '../../components/controllers/premieres';
import Search from '../../components/controllers/search';
import Popular from '../../components/controllers/popular';
import View from '../../components/controllers/view';
import ShowService from '../../services/showService';

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
          element={<Search />}
        />
        <Route
          path="/popular"
          element={<Popular shows={ShowService.getPopular()} />}
        />
        <Route
          path="/view/:id"
          element={<View />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
