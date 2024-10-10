// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useState, useEffect } from 'react';

interface Show {
    // Define the structure of a show object
}

interface PremieresControllerProps {
    shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    const [pageTitle, setPageTitle] = useState<string>("PREMIERES");
    const [pageDescription, setPageDescription] = useState<string>("Brand new shows showing this month.");

    useEffect(() => {
        // Set page title and description
        document.title = pageTitle;
        // Assuming there's a way to set meta description in your app
        // setMetaDescription(pageDescription);
    }, [pageTitle, pageDescription]);

    return (
        <ul className="list-of-shows">
            {shows.map((show, index) => (
                <li key={index} className="col-xs-6 col-md-4">
                    {/* Assuming <ShowComponent> is a React component that takes a show prop */}
                    <ShowComponent show={show} />
                </li>
            ))}
        </ul>
    );
};

export default PremieresController;
