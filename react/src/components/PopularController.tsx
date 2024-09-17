// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
// Assuming PageValues is not available, we need to define it here or import it correctly
// import PageValues from '../../utils/constants/PageValues';

type ShowType = {
    id: number;
    name: string;
};

// Temporary fix for PageValues since the module cannot be found
const PageValues = {
    title: '',
    description: ''
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
