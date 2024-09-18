// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

type ShowType = {
    id: number;
    original_name: string;
    cast?: Array<{ name: string }>;
};

const ViewController: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<ShowType | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch show details
            axios.get(`/api/shows/${id}`).then(response => {
                const showData = response.data;
                setShow(showData);
                PageValues.title = "VIEW";
                PageValues.description = `Overview, seasons & info for '${showData.original_name}'.`;
            });

            // Fetch cast details
            axios.get(`/api/shows/${id}/cast`).then(response => {
                if (show) {
                    setShow(prevShow => ({
                        ...prevShow!,
                        cast: response.data.cast
                    }));
                }
            });
        }
    }, [id]);

    if (!show) return <div>Loading...</div>;

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <div style={setBannerImage()}></div>
            <h2>{show.original_name}</h2>
            {show.cast && (
                <ul>
                    {show.cast.map((member, index) => (
                        <li key={index}>{member.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

function setBannerImage() {
    return {
        background: 'url() no-repeat',
        backgroundSize: '100%',
        backgroundPosition: '100% 0%'
    };
}

export default ViewController;
