import React, { useEffect, useState } from 'react';
import PageValues from '../utils/constants/PageValues';
import Show from './show';
import axios from 'axios';
import BASE_URL from '../utils/constants/BASE_URL';
import { API_KEY } from '../utils/constants/API_KEY';

interface ShowType {
    id: number;
    original_name: string;
    cast: Array<{ id: number; name: string; character: string }>;
}

interface ViewControllerProps {
    show: ShowType;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<Array<{ id: number; name: string; character: string }>>([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        // Fetch cast information
        const fetchCast = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/show/${show.id}/credits?api_key=${API_KEY}`);
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
            <Show show={show} />
            <h2>Cast</h2>
            <ul>
                {cast.map((member) => (
                    <li key={member.id}>
                        {member.name} as {member.character}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewController;
