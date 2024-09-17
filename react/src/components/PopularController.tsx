﻿// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
// Importing PageValues from a mock or alternative source as the original module cannot be found
const PageValues = {
    title: '',
    description: ''
};

type ShowType = {
    id: number;
    name: string;
};

const PopularController: React.FC<{ shows: ShowType[] }> = ({ shows }) => {
    const [popularShows, setPopularShows] = useState<ShowType[]>([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        // Setup view model object
        setPopularShows(shows);
    }, [shows]);

    return (
        <div>
            <h1>Popular Shows</h1>
            <ul>
                {popularShows.map((show) => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
