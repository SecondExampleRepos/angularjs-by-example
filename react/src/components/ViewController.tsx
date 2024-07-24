import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

interface Show {
    id: number;
    original_name: string;
    cast: Array<{ id: number; name: string }>;
}

interface ViewControllerProps {
    show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/show/${show.id}/cast?api_key=${API_KEY}`);
                setCast(response.data.cast);
            } catch (error) {
                console.error('Error fetching cast:', error);
            }
        };

        fetchCast();
    }, [show.id]);

    const setBannerImage = () => {
        return {
            background: 'url() no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '100% 0%',
        };
    };

    return (
        <div>
            <h1>{show.original_name}</h1>
            <div style={setBannerImage()}></div>
            <h2>Cast</h2>
            <ul>
                {cast.map((member) => (
                    <li key={member.id}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewController;
