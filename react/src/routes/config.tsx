// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated imports
import Home from '../components/home'; // Ensure this module exists
import Premieres from '../components/premieres'; // Ensure this module exists
import Search from '../components/search'; // Ensure this module exists
import Popular from '../components/popular'; // Ensure this module exists
import View from '../components/view'; // Ensure this module exists
import ShowService from '../services/ShowService'; // Corrected casing

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes> {/* Changed Switch to Routes */}
                <Route path="/" element={<Home />} /> {/* Updated to use element prop */}
                <Route 
                    path="/premieres" 
                    element={<Premieres shows={ShowService().getPremieres()} />} // Corrected method call
                />
                <Route path="/search" element={<Search />} /> {/* Updated to use element prop */}
                <Route 
                    path="/search/:query" 
                    element={<Search />} // Removed function to match ReactNode type
                />
                <Route 
                    path="/popular" 
                    element={<Popular shows={ShowService().getPopular()} />} // Corrected method call
                />
                <Route 
                    path="/view/:id" 
                    element={<View />} // Removed function to match ReactNode type
                />
                <Route path="*" element={<Navigate to="/" />} /> {/* Changed Redirect to Navigate */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
