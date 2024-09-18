import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/controllers/HomeController';
import Premieres from '../components/controllers/PremieresController';
import Search from '../components/controllers/SearchController';
import Popular from '../components/controllers/PopularController';
import View from '../components/controllers/ViewController';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/premieres" element={<Premieres />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/view/:id" element={<View />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
