// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageValues from '../utils/constants/PageValues';
import ShowService from '../services/ShowService';

interface Show {
    id: string;
    original_name: string;
    cast: Array<{ name: string; character: string }>;
}

interface ViewControllerProps {
    show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<Show['cast']>([]);
    const location = useLocation();

    useEffect(() => {
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        const fetchCast = async () => {
            try {
                const response = await ShowService.getCast(show.id);
                setCast(response.cast);
            } catch (error) {
                console.error('Failed to fetch show cast', error);
            }
        };

        fetchCast();
    }, [show.id, show.original_name]);

    const setBannerImage = () => ({
        background: 'url() no-repeat',
        backgroundSize: '100%',
        backgroundPosition: '100% 0%',
    });

    return (
        <div style={setBannerImage()}>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <h3>Cast</h3>
            <ul>
                {cast.map((member, index) => (
                    <li key={index}>
                        {member.name} as {member.character}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewController;
