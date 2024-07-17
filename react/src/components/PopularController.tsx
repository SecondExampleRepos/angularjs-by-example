// react/src/components/PopularController.tsx

import React, { useEffect } from 'react';
import { PageValues } from '../utils/constants/PageValues';

type PopularControllerProps = {
    shows: any[]; // Adjust the type according to the actual data structure of shows
};

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    useEffect(() => {
        // Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";
    }, []);

    return (
        <div>
            {/* Render the shows here */}
            {shows.map((show, index) => (
                <div key={index}>
                    {/* Render show details */}
                    {show.name}
                </div>
            ))}
        </div>
    );
};

export default PopularController;
