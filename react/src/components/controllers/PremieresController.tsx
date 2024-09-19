// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    original_name: string;
};

const PremieresController: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";

        ShowService.getPremieres().then((data) => {
            setShows(data);
        });
    }, []);

    return (
        <div>
            <h1>Premieres</h1>
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>{show.original_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
