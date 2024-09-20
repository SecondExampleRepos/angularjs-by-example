import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/controllers/HomeController';
import Premieres from './components/controllers/PremieresController';
import Search from './components/controllers/SearchController';
import Popular from './components/controllers/PopularController';
import View from './components/controllers/ViewController';
import ShowService from './services/ShowService';

import './assets/src/sections/home/home.css';
import './assets/src/sections/premieres/premieres.css';
import './assets/src/sections/search/search.css';
import './assets/src/sections/view/view.css';
import './assets/src/components/show/show.css';
import './assets/src/assets/css/animations.css';
import './assets/src/assets/css/font-icons.css';
import './assets/src/assets/css/style.css';

// Converted from src/app.routes.js

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/premieres"
        element={<Premieres />}
        loader={async () => {
          const shows = await ShowService.getPremieres();
          return { shows };
        }}
      />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:query" element={<Search />} />
      <Route
        path="/popular"
        element={<Popular />}
        loader={async () => {
          const shows = await ShowService.getPopularShows();
          return { shows };
        }}
      />
      <Route
        path="/view/:id"
        element={<View />}
        loader={async ({ params }) => {
          const show = await ShowService.getShow(Number(params.id));
          return { show };
        }}
      />
    </Routes>
  );
}

export default App;
