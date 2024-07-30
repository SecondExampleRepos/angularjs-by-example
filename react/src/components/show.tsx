import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';

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
                console.error('Error fetching show genres:', error);
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
