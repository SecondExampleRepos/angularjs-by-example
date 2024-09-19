// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    original_name: string;
    cast: Array<{ name: string; character: string }>;
};

const ViewController: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<Show | null>(null);

    useEffect(() => {
        if (id) {
            // Fetch show details
            axios.get(`/api/shows/${id}`).then((response) => {
                setShow(response.data);
                PageValues.title = "VIEW";
                PageValues.description = `Overview, seasons & info for '${response.data.original_name}'.`;
            });

            // Fetch show cast
            axios.get(`/api/shows/${id}/cast`).then((response) => {
                if (show) {
                    setShow({ ...show, cast: response.data.cast });
                }
            });
        }
    }, [id]);

    const setBannerImage = () => ({
        background: 'url() no-repeat',
        backgroundSize: '100%',
        backgroundPosition: '100% 0%',
    });

    if (!show) return <div>Loading...</div>;

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            {/* Render show details and cast here */}
        </div>
    );
};

export default ViewController;
