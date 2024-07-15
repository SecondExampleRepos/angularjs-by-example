import React, { useEffect } from 'react';

// Assuming PageValues is a context or a state management object
import { usePageValues } from '../utils/PageValuesContext'; // Adjust the path as necessary

interface PopularControllerProps {
    shows: any[]; // Define a more specific type if available
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    const { setTitle, setDescription } = usePageValues();

    useEffect(() => {
        // Set page title and description
        setTitle("POPULAR");
        setDescription("The most popular TV shows.");
    }, [setTitle, setDescription]);

    return (
        <div>
            {/* Render the shows */}
            {shows.map(show => (
                <div key={show.id}>
                    <h2>{show.name}</h2>
                    {/* Add more show details as needed */}
                </div>
            ))}
        </div>
    );
};

export default PopularController;
