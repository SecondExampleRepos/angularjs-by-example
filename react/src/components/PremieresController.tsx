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
        

            {shows.length > 0 ? (
                <ul>
                    {shows.map((show, index) => (
                        <li key={index}>{show.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No shows available this month.</p>
            )}
        </div>
    );
};

export default PremieresController;
