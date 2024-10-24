// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ShowProps = {
    show: {
        id: number;
    };
};

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<Array<string>>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`http://api.themoviedb.org/3/tv/${show.id}?api_key=87de9079e74c828116acce677f6f255b`);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Failed to fetch genres', error);
            }
        };

        fetchGenres();
    }, [show.id]);

    return (
        <div>
            <h2>Genres</h2>
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
