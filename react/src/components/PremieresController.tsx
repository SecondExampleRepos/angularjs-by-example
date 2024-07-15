import React, { useEffect } from 'react';

interface PageValues {
    title: string;
    description: string;
}

interface PremieresControllerProps {
    shows: any[];
    pageValues: PageValues;
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows, pageValues }) => {
    useEffect(() => {
        // Set page title and description
        pageValues.title = "PREMIERES";
        pageValues.description = "Brand new shows showing this month.";
    }, [pageValues]);

    return (
        <div>
            <h1>{pageValues.title}</h1>
            <p>{pageValues.description}</p>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
