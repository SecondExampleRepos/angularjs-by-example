// Converted from src/sections/premieres/premieres.ctrl.js

import React from 'react';

interface PremieresControllerProps {
    shows: any[]; // Adjust the type based on the actual structure of 'shows'
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    // Set page title and description
    React.useEffect(() => {
        document.title = "PREMIERES";
        // Assuming there's a way to set the description, as React doesn't have a direct equivalent
        // You might use a library like react-helmet for setting meta tags
    }, []);

    return (
        <div>
            <h1>Premieres</h1>
            <p>Brand new shows showing this month.</p>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li> // Assuming 'show' has a 'name' property
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
