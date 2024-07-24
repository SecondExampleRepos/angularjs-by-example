import React, { useEffect, useState } from 'react';

// Assuming PageValues is a context or a state management object
import { PageValues } from '../utils/constants/PageValues';
import { getShows } from '../services/popularService';

const PopularController: React.FC = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "POPULAR";
        PageValues.description = "The most popular TV shows.";

        // Fetch shows data
        getShows().then(data => {
            setShows(data);
        }).catch(error => {
            console.error("Error fetching shows:", error);
        });
    }, []);

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {shows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
