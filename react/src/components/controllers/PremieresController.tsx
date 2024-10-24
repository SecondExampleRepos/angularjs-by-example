// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import PageValues from '../../../utils/constants/PageValues';

type PremieresControllerProps = {
    shows: Array<any>;
};

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    const [premiereShows, setPremiereShows] = useState<Array<any>>(shows);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";
    }, []);

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {premiereShows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
