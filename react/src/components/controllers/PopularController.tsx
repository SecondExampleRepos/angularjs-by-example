// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';

interface Show {
    id: string;
    // Add other show properties if needed
}

const PopularController: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        const fetchPopularShows = async () => {
            try {
                const popularShows = await ShowService.getPopular();
                setShows(popularShows);
            } catch (error) {
                console.error('Failed to fetch popular shows', error);
            }
        };

        fetchPopularShows();
    }, []);

    return (
        <div className="trending-results">
            {shows.length === 0 ? (
                <div className="no-data">There are no popular shows available to display</div>
            ) : (
                <ul className="list-of-shows">
                    {shows.map((show) => (
                        <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
                            <Show show={show} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PopularController;
