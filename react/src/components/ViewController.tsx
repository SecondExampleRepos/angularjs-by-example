import React, { useEffect, useState } from 'react';
import ShowService from '../services/ShowService';

interface Show {
    id: number;
    original_name: string;
    cast: Array<any>;
}

interface ViewControllerProps {
    show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<Array<any>>([]);

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
            <div>
                {cast.map((member, index) => (
                    <div key={index}>{member.name}</div>
                ))}
            </div>
        </div>
    );
};

export default ViewController;
