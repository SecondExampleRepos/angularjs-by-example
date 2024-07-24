import React, { useEffect, useState } from 'react';
import PageValues from '../utils/constants/PageValues';

interface Show {
    // Define the structure of a show object
    id: number;
    name: string;
    // Add other relevant fields
}

interface PopularControllerProps {
    shows: Show[];
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    const [showList, setShowList] = useState<Show[]>([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        // Setup view model object
        setShowList(shows);
    }, [shows]);

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {showList.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
