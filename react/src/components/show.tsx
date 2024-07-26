import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/constants/BASE_URL';
import { API_KEY } from '../utils/constants/API_KEY';

interface ShowProps {
    show: {
        id: number;
    };
}

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<string[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/show/${show.id}`, {
                    params: {
                        api_key: API_KEY
                    }
                });
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
                {genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
