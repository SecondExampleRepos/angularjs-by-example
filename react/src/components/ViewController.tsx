// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// Removed import for PageValues as the module cannot be found

type ShowType = {
    id: number;
    original_name: string;
    cast?: Array<any>;
};

type CastType = {
    cast: Array<any>;
};

const ViewController: React.FC<{ show: ShowType }> = ({ show }) => {
    const [cast, setCast] = useState<Array<any>>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        // PageValues.title = "VIEW"; // Cannot set title as PageValues module is missing
        // PageValues.description = `Overview, seasons & info for '${show.original_name}'.`; // Cannot set description as PageValues module is missing

        const fetchCast = async () => {
            try {
                const response = await axios.get<CastType>(`/tv/${id}/credits`);
                setCast(response.data.cast);
            } catch (error) {
                console.error('Failed to fetch cast', error);
            }
        };

        fetchCast();
    }, [id, show.original_name]);

    const setBannerImage = () => ({
        background: 'url() no-repeat',
        backgroundSize: '100%',
        backgroundPosition: '100% 0%',
    });

    return (
        <div style={setBannerImage()}>
            {/* Render the show and cast information here */}
            <h1>{show.original_name}</h1>
            <ul>
                {cast.map((member, index) => (
                    <li key={index}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewController;
