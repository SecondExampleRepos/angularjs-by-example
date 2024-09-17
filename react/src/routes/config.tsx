// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/HomeController';
import Premieres from '../components/PremieresController';
import Search from '../components/SearchController';
import Popular from '../components/PopularController';
import View from '../components/ViewController';
import ShowService from '../services/ShowService';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/premieres" 
                    element={<Premieres shows={ShowService().getPremieres()} />}
                />
                <Route path="/search" element={<Search />} />
                <Route 
                    path="/search/:query" 
                    element={<Search query={window.location.pathname.split('/').pop()} />}
                />
                <Route 
                    path="/popular" 
                    element={<Popular shows={ShowService().getPopular()} />}
                />
                <Route 
                    path="/view/:id" 
                    element={<View show={ShowService().get(parseInt(window.location.pathname.split('/').pop() || '0'))} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
