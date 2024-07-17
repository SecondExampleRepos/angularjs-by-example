import React, { useEffect, useState } from 'react';
import { PageValues } from '../utils/constants/PageValues';
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
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        // Fetch cast information
        ShowService.getCast(show.id).then(response => {
            setCast(response.cast);
        });
    }, [show]);

    const setBannerImage = () => {
        return {
            background: 'url() no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '100% 0%'
        };
    };

    return (
        <div>
            {/* Render the show details and cast information here */}
            <h1>{show.original_name}</h1>
            <div style={setBannerImage()}></div>
            <ul>
                {cast.map((member, index) => (
                    <li key={index}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewController;
