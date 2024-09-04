// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowService from '../services/ShowService';
import PageValues from '../utils/constants/PageValues';

interface ViewControllerProps {
    show: {
        id: string;
        original_name: string;
        cast?: Array<{ name: string; character: string }>;
    };
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<Array<{ name: string; character: string }>>([]);
    const location = useLocation();

    useEffect(() => {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        // Fetch cast information
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
        backgroundPosition: '100% 0%'
    });

    return (
        <div style={setBannerImage()}>
            <h1>{show.original_name}</h1>
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
