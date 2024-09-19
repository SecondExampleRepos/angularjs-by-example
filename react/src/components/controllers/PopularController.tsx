// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    name: string;
};

const PopularController: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        // Fetch popular shows
        axios.get('/api/popular')
            .then((response) => {
                setShows(response.data);
            })
            .catch((error) => {
                console.error('Error fetching popular shows:', error);
            });
    }, []);

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
