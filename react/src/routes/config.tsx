// Converted from src/app.routes.js

import { Route, Routes } from 'react-router-dom';
import Home from '../components/controllers/HomeController';
import Premieres from '../components/controllers/PremieresController';
import Search from '../components/controllers/SearchController';
import Popular from '../components/controllers/PopularController';
import View from '../components/controllers/ViewController';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/premieres" element={<Premieres />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/view/:id" element={<View />} />
    </Routes>
  );
}
