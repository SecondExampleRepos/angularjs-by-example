import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../components/controllers/Home';
import Premieres from '../../components/controllers/Premieres';
import Search from '../../components/controllers/Search';
import Popular from '../../components/controllers/Popular';
import View from '../../components/controllers/View';

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
