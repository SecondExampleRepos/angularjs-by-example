// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import PageValues from '../utils/constants/PageValues';

type Show = {
    // Define the structure of a show object if known
};

type PopularControllerProps = {
    shows: Show[];
};

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    const [pageTitle, setPageTitle] = useState<string | null>(null);
    const [pageDescription, setPageDescription] = useState<string | null>(null);

    useEffect(() => {
        // Set page title and description
        setPageTitle("POPULAR");
        setPageDescription("The most popular TV shows.");
    }, []);

    useEffect(() => {
        // Update PageValues when component mounts
        PageValues.title = pageTitle;
        PageValues.description = pageDescription;
    }, [pageTitle, pageDescription]);

    return (
        <div>
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{/* Render show details here */}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
