// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/showService';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    name: string;
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

export default PremieresController;
