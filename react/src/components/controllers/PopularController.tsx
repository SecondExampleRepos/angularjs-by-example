// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';
import PageValues from '../../utils/constants/PageValues';

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

        ShowService.getPopular().then((data) => {
            setShows(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Popular TV Shows</h1>
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
