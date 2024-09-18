// Converted from src/app.routes.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/HomeController';
import Premieres from '../components/PremieresController';
import Search from '../components/SearchController';
import Popular from '../components/PopularController';
import View from '../components/ViewController';
import ShowService from '../services/ShowService';

const AppRoutes: React.FC = () => {
    const [premiereShows, setPremiereShows] = useState<any[]>([]);
    const [popularShows, setPopularShows] = useState<any[]>([]);
    const [viewShow, setViewShow] = useState<any | null>(null);

    useEffect(() => {
        const fetchPremieres = async () => {
            const shows = await ShowService().getPremieres();
            setPremiereShows(shows);
        };

        const fetchPopular = async () => {
            const shows = await ShowService().getPopular();
            setPopularShows(shows);
        };

        fetchPremieres();
        fetchPopular();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                    path="/premieres" 
                    element={
                        <Premieres 
                            shows={premiereShows}
                        />
                    }
                />
                <Route path="/search" element={<Search />} />
                <Route 
                    path="/search/:query" 
                    element={
                        <Search 
                            query={useParams<{ query: string }>().query || ''} // Ensure query is not undefined
                        />
                    }
                />
                <Route 
                    path="/popular" 
                    element={
                        <Popular 
                            shows={popularShows}
                        />
                    }
                />
                <Route 
                    path="/view/:id" 
                    element={
                        <View 
                            show={viewShow}
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
