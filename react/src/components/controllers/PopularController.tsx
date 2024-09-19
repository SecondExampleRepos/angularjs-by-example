// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    original_name: string;
};

const PopularController: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        ShowService.getPopular().then((data) => {
            setShows(data);
        });
    }, []);

    return (
        <div>
            <h1>Popular TV Shows</h1>
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>{show.original_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
