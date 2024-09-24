// Converted from src/sections/popular/popular.ctrl.js

import React from 'react';
import PageValues from '../utils/constants/PageValues';

type PopularControllerProps = {
    shows: any[]; // Adjust the type based on the actual structure of 'shows'
};

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    // Set page title and description
    PageValues.title = "POPULAR";
    PageValues.description = "The most popular TV shows.";

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li> // Assuming 'show' has a 'name' property
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
