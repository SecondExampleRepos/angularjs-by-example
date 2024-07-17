import React, { useEffect, useState } from 'react';
import ShowService from '../services/showService';

interface ViewControllerProps {
    show: {
        id: number;
        original_name: string;
    };
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<any[]>([]);

    useEffect(() => {
        ShowService.getCast(show.id).then(response => {
            setCast(response.cast);
        });
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
