// Converted from src/components/show/show.drct.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ShowProps {
    show: {
        id: number;
        genres: { name: string }[];
    };
}

const Show: React.FC<ShowProps> = ({ show }) => {
    const [genres, setGenres] = useState<{ name: string }[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`/api/shows/${show.id}`);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, [show.id]);

    return (
        <div className="show-frame">
            <ul className="genres">
                {genres.map((genre, index) => (
                    <li key={index} className="animate-repeat" style={{ backgroundColor: `rgba(59, 185, 187, ${genres.length / (index + 1) / 5})` }}>
                        {genre.name}
                    </li>
                ))}
            </ul>
            {/* Additional JSX can be added here based on the original template */}
        </div>
    );
};

export default Show;
