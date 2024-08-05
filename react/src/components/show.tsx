import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/constants/BASE_URL';
import { API_KEY } from '../utils/constants/API_KEY';

interface ShowProps {
    show: {
        id: number;
    };
}

interface Genre {
    id: number;
    name: string;
}

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/show/${show.id}?api_key=${API_KEY}`);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, [show.id]);

    return (
        <div>
            <h1>Show Genres</h1>
            <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
