// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues'; // Corrected the import path

type ShowType = {
    id: number;
    name: string;
};

const PremieresController: React.FC = () => {
    const [shows, setShows] = useState<ShowType[]>([]);

    useEffect(() => {
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";

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

export default PremieresController;
