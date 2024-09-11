// Converted from src/sections/popular/popular.ctrl.js

import React from 'react';

interface PopularControllerProps {
    shows: any[]; // Adjust the type based on the actual data structure of shows
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    // Set page title and description
    React.useEffect(() => {
        document.title = "POPULAR";
        // Assuming there's a way to set description, as React doesn't have a direct equivalent
        // You might use a library like react-helmet for setting meta tags
    }, []);

    return (
        <div>
            <h1>Popular TV Shows</h1>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li> // Assuming each show has a 'name' property
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
