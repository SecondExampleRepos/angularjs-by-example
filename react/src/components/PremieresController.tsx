// Converted from src/sections/premieres/premieres.ctrl.js

import React from 'react';

interface PremieresControllerProps {
    shows: any[]; // Replace 'any' with a more specific type if available
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    // Set page title and description
    React.useEffect(() => {
        document.title = "PREMIERES";
        // Assuming there's a way to set description, as React doesn't have a direct equivalent
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute("content", "Brand new shows showing this month.");
        }
    }, []);

    return (
        <div>
            {/* Render the shows */}
            {shows.map((show, index) => (
                <div key={index}>
                    {/* Assuming show has a 'name' property, adjust as necessary */}
                    <h2>{show.name}</h2>
                </div>
            ))}
        </div>
    );
};

export default PremieresController;
