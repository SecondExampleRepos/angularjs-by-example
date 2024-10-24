// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import PageValues from '../../utils/constants/PageValues';
import ShowService from '../../services/ShowService';

type PopularControllerProps = {
    shows: Array<any>;
};

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    const [popularShows, setPopularShows] = useState<Array<any>>(shows);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        // Fetch popular shows if not provided
        if (!shows || shows.length === 0) {
            fetchPopularShows();
        }
    }, [shows]);

    const fetchPopularShows = async () => {
        try {
            const response = await ShowService.getPopular();
            setPopularShows(response);
        } catch (error) {
            console.error('Failed to fetch popular shows', error);
        }
    };

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {popularShows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
