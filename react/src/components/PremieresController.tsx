import React, { useEffect, useState } from 'react';
import PageValues from '../utils/constants/PageValues';

interface Show {
    // Define the structure of a show object
    id: number;
    name: string;
    // Add other relevant fields
}

interface PremieresControllerProps {
    shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    const [pageTitle, setPageTitle] = useState<string | null>(null);
    const [pageDescription, setPageDescription] = useState<string | null>(null);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";
        setPageTitle(PageValues.title);
        setPageDescription(PageValues.description);
    }, []);

    return (
        <div>
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
            <ul>
                {shows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
