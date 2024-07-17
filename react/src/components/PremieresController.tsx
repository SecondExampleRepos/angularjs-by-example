// react/src/components/PremieresController.tsx

import React, { useEffect } from 'react';
import { PageValues } from '../utils/constants/PageValues';

interface PremieresControllerProps {
    shows: any[]; // Adjust the type based on the actual structure of `shows`
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    useEffect(() => {
        // Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";
    }, []);

    return (
        <div>
            {/* Render the shows here */}
            {shows.map((show, index) => (
                <div key={index}>
                    {/* Render show details */}
                    <h2>{show.title}</h2>
                    <p>{show.description}</p>
                </div>
            ))}
        </div>
    );
};

export default PremieresController;
