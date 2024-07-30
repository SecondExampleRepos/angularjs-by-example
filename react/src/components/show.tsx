import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ShowProps {
    show: {
        id: number;
    };
}

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`/api/shows/${show.id}`)
            .then(response => {
                setGenres(response.data.genres);
            })
            .catch(error => {
                console.error('Error fetching show genres:', error);
            });
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
