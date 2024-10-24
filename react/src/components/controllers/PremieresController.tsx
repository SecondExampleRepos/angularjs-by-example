// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect } from 'react';
import PageValues from '../../utils/constants/PageValues'; // Adjusted the import path

type PremieresControllerProps = {
    shows: Array<{ name: string }>;
};

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
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
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
