﻿// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useState, useEffect } from 'react';
import PageValues from '../utils/constants/PageValues';

type Show = {
    // Define the structure of a show object if known
};

type PremieresControllerProps = {
    shows: Show[];
};

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    const [pageTitle, setPageTitle] = useState<string | null>(null);
    const [pageDescription, setPageDescription] = useState<string | null>(null);

    useEffect(() => {
        // Set page title and description
        setPageTitle("PREMIERES");
        setPageDescription("Brand new shows showing this month.");
        
        // Update PageValues with the new title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";
    }, []);

    return (
        <div>
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>
                        {/* Render show details here */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
