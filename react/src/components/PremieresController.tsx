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
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";

        const fetchPremiereShows = async () => {
            try {
                const response = await axios.get<ShowType[]>('/api/premieres');
                setShows(response.data);
            } catch (error) {
                console.error('Failed to fetch premiere shows', error);
            }
        };

        fetchPremiereShows();
    }, []);

    return (
        <div>
            <h1>Premiere Shows</h1>
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
