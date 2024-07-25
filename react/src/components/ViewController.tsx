import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageValues from '../utils/constants/PageValues';
import API_KEY from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

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
        const fetchCast = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/show/${show.id}/cast?api_key=${API_KEY}`);
                setCast(response.data.cast);
            } catch (error) {
                console.error('Error fetching cast:', error);
            }
        };

        fetchCast();
    }, [show.id, show.original_name]);

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
