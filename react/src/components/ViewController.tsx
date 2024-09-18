// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../utils/constants/PageValues';

type Show = {
    id: number;
    original_name: string;
    cast: Array<{ name: string }>;
};

const ViewController: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<Show | null>(null);

    useEffect(() => {
        if (id) {
            // Set page title and description
            PageValues.title = "VIEW";
            PageValues.description = `Overview, seasons & info for '${show?.original_name}'.`;

            // Fetch show details
            axios.get(`/api/tv/${id}`)
                .then(response => {
                    setShow(response.data);
                })
                .catch(error => {
                    console.error('Error fetching show details:', error);
                });

            // Fetch cast details
            axios.get(`/api/tv/${id}/credits`)
                .then(response => {
                    if (show) {
                        setShow({ ...show, cast: response.data.cast });
                    }
                })
                .catch(error => {
                    console.error('Error fetching cast details:', error);
                });
        }
    }, [id, show]);

    const setBannerImage = () => ({
        background: 'url() no-repeat',
        backgroundSize: '100%',
        backgroundPosition: '100% 0%'
    });

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            {/* Render show and cast information */}
            {show && (
                <div>
                    <h2>{show.original_name}</h2>
                    <ul>
                        {show.cast.map((member, index) => (
                            <li key={index}>{member.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ViewController;
