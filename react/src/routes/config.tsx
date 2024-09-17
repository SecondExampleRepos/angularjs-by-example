// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Home from '../components/home'; // Ensure this module exists
import Premieres from '../components/premieres'; // Ensure this module exists
import Search from '../components/search'; // Ensure this module exists
import Popular from '../components/popular'; // Ensure this module exists
import View from '../components/view'; // Ensure this module exists
import ShowService from '../services/ShowService'; // Corrected casing

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
                    element={<Search query={useParams().query} />} 
                />
                <Route 
                    path="/popular" 
                    element={<Popular shows={ShowService().getPopular()} />} 
                />
                <Route 
                    path="/view/:id" 
                    element={<View show={ShowService().get(Number(useParams().id))} />} // Coerce id to number
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
