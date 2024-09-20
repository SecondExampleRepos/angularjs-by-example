// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

type ShowType = {
    id: number;
    name: string;
};

const PremieresController: React.FC = () => {
    const [shows, setShows] = useState<ShowType[]>([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";

        // Fetch premieres shows
        const fetchPremieres = async () => {
            try {
                const response = await axios.get('/api/premieres');
                setShows(response.data);
            } catch (error) {
                console.error('Error fetching premieres:', error);
            }
        };

        fetchPremieres();
    }, []);

    return (
        <div>
            <h1>Premieres</h1>
            <ul>
                {shows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
