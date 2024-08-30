// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import ShowService from '../services/ShowService';

interface ShowProps {
    show: {
        id: string;
    };
}

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<string[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await ShowService.get(show.id);
                setGenres(response.genres);
            } catch (error) {
                console.error('Failed to fetch show genres', error);
            }
        };

        fetchGenres();
    }, [show.id]);

    return (
        <div>
            <h3>Genres</h3>
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
