import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../components/controllers/Home';
import Premieres from '../../components/controllers/Premieres';
import Search from '../../components/controllers/Search';
import Popular from '../../components/controllers/Popular';
import View from '../../components/controllers/View';

// CSS imports
import 'react/src/App.css';
import 'react/src/index.css';
import 'src/sections/home/home.css';
import 'src/sections/premieres/premieres.css';
import 'src/sections/search/search.css';
import 'src/sections/view/view.css';
import 'src/components/show/show.css';
import 'src/assets/css/animations.css';
import 'src/assets/css/font-icons.css';
import 'src/assets/css/style.css';

// Converted from src/app.routes.js

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/premieres" element={<Premieres />} />
        <Route path="/search/:query?" element={<Search />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
