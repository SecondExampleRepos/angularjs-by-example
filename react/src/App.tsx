import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../components/controllers/Home';
import Premieres from '../../components/controllers/Premieres';
import Search from '../../components/controllers/Search';
import Popular from '../../components/controllers/Popular';
import View from '../../components/controllers/View';
import ShowService from '../../services/ShowService';

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
          const shows = await ShowService.getPopular();
          return { shows };
        }}
      />
      <Route
        path="/view/:id"
        element={<View />}
        loader={async ({ params }) => {
          const show = await ShowService.get(params.id);
          return { show };
        }}
      />
    </Routes>
  );
}

export default App;
