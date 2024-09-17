﻿// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ShowProps = {
    show: {
        id: number;
    };
};

type GenreType = {
    id: number;
    name: string;
};

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<GenreType[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`/tv/${show.id}`);
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
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
