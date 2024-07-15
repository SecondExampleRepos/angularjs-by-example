import React, { useEffect, useState } from 'react';
import ShowService from '../../services/showService';

interface ShowProps {
    show: {
        id: number;
        // Add other show properties as needed
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
            {/* Render genres or other show details here */}
            <ul>
                {genres.map((genre, index) => (
                    <li key={index}>{genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default Show;
