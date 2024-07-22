import React, { useEffect, useState } from 'react';
import ShowService from '../services/ShowService';

interface Show {
    id: string;
    original_name: string;
    cast: Array<any>;
}

interface ViewControllerProps {
    show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<Array<any>>([]);

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
