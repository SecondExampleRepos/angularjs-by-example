// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowService from '../../../services/ShowService';

interface Show {
    id: string;
    original_name: string;
    cast: Array<{ name: string; character: string }>;
}

interface ViewControllerProps {
    show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState(show.cast || []);
    const location = useLocation();

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await ShowService.getCast(show.id);
                setCast(response.cast);
            } catch (error) {
                console.error('Failed to fetch cast', error);
            }
        };

        fetchCast();
    }, [show.id]);

    const setBannerImage = () => ({
        background: 'url() no-repeat',
        backgroundSize: '100%',
        backgroundPosition: '100% 0%',
    });

    return (
        <div className="view-container">
            <div className="view-banner" style={setBannerImage()}></div>
            <div className="view-title">
                <h2>{show.original_name}</h2>
                <ul>
                    {cast.map((member, index) => (
                        <li key={index}>
                            {member.name} as {member.character}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewController;
