// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/showService';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    name: string;
};

const PopularController: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        // Fetch popular shows
        ShowService.getPopular().then((data) => {
            setShows(data);
        });
    }, []);

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
