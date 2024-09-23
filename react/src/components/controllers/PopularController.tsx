// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// PageValues module is missing. Creating a mock object to resolve the error.
const PageValues = {
    title: '',
    description: ''
};

type ShowType = {
    id: number;
    name: string;
};

const PopularController: React.FC = () => {
    const [shows, setShows] = useState<ShowType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        axios.get('/api/shows/popular')
            .then(response => {
                setShows(response.data.results);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {shows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
