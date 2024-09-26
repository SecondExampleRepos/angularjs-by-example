// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import PageValues from '../utils/constants/PageValues';

type ShowType = {
    id: number;
    // Add other relevant show properties here
};

type PremieresControllerProps = {
    shows: ShowType[];
};

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    const [pageTitle, setPageTitle] = useState<string | null>(null);
    const [pageDescription, setPageDescription] = useState<string | null>(null);

    useEffect(() => {
        // Set page title and description
        setPageTitle("PREMIERES");
        setPageDescription("Brand new shows showing this month.");
    }, []);

    useEffect(() => {
        // Update PageValues with the current title and description
        PageValues.title = pageTitle;
        PageValues.description = pageDescription;
    }, [pageTitle, pageDescription]);

    return (
        <div>
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
            <ul className="list-of-shows">
                {shows.map(show => (
                    <li key={show.id} className="col-xs-6 col-md-4">
                        {/* Assuming a Show component exists */}
                        <Show show={show} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
