import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';

interface ViewControllerProps {
    show: {
        id: string;
        original_name: string;
    };
    PageValues: {
        title: string;
        description: string;
    };
}

const ViewController: React.FC<ViewControllerProps> = ({ show, PageValues }) => {
    const [cast, setCast] = useState<any[]>([]);

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
                console.error('Error fetching show cast:', error);
            }
        };

        fetchCast();
    }, [show.id, show.original_name, PageValues]);

    const setBannerImage = () => {
        return {
            background: 'url() no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '100% 0%'
        };
    };

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
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
