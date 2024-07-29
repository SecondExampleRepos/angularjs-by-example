import React, { useEffect, useState } from 'react';
import PageValues from '../utils/constants/PageValues';
import ShowService from '../services/ShowService';

interface ViewControllerProps {
    show: {
        id: string;
        original_name: string;
    };
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    // Set page title and description
    useEffect(() => {
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;
    }, [show.original_name]);

    // Setup view model object
    const [cast, setCast] = useState<any[]>([]);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await ShowService.getCast(show.id);
                setCast(response.cast);
            } catch (error) {
                console.error('Error fetching show cast:', error);
            }
        };

        fetchCast();
    }, [show.id]);

    const setBannerImage = () => {
        return {
            background: 'url() no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '100% 0%'
        };
    };

    return (
        <div>
            <h1>{show.original_name}</h1>
            <div style={setBannerImage()}></div>
            <h2>Cast</h2>
            <ul>
                {cast.map((member, index) => (
                    <li key={index}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewController;
