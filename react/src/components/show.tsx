import React, { useEffect, useState } from 'react';
import ShowService from '../services/showService';

interface ShowProps {
    show: {
        id: number;
    };
}

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<string[]>([]);

    useEffect(() => {
        ShowService.get(show.id).then(response => {
            setGenres(response.genres);
        });
    }, [show.id]);

    return (
        <div>
            <h1>Genres</h1>
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
