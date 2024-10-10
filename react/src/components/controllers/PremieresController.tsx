// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Assuming PageValues is a service that needs to be converted
const PageValues = {
    title: null,
    description: null,
    loading: false
};

// Assuming ShowService is a service that needs to be converted
const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

const getPremieres = async () => {
    const date = new Date();
    date.setDate(1);
    const formattedDate = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const requestUrl = `${BASE_URL}/discover/tv?api_key=${API_KEY}&first_air_date.gte=${formattedDate}&append_to_response=genres`;

    try {
        const response = await axios.get(requestUrl, {
            headers: {
                'Content-Type': 'application/json'
            },
            cache: true
        });
        return response.data.results;
    } catch (error) {
        console.error('XHR Failed for ShowService', error);
        throw error;
    }
};

const PremieresController: React.FC = () => {
    const [shows, setShows] = useState<any[]>([]);
    const location = useLocation();

    useEffect(() => {
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";

        const fetchPremieres = async () => {
            try {
                const premieres = await getPremieres();
                setShows(premieres);
            } catch (error) {
                console.error('Failed to fetch premieres', error);
            }
        };

        fetchPremieres();
    }, [location]);

    return (
        <ul className="list-of-shows">
            {shows.map((show, index) => (
                <li key={index} className="col-xs-6 col-md-4">
                    {/* Assuming <Show /> is a React component that needs to be created */}
                    <Show data-show={show} />
                </li>
            ))}
        </ul>
    );
};

// Assuming Show is a component that needs to be created
const Show: React.FC<{ data-show: any }> = ({ data-show }) => {
    // Render logic for individual show
    return <div>{data-show.name}</div>;
};

export default PremieresController;
