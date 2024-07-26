import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/constants/BASE_URL';
import PageValues from '../utils/constants/PageValues';
import { API_KEY } from '../utils/constants/API_KEY';

interface ViewControllerProps {
    show: {
        id: number;
        original_name: string;
    };
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<any[]>([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        // Fetch cast information
        const fetchCast = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/show/${show.id}/cast`, {
                    params: {
                        api_key: API_KEY
                    }
                });
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
