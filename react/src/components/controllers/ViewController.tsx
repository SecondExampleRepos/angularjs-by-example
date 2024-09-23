// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// PageValues module is missing. Creating a mock object to resolve the error.
const PageValues = {
    title: '',
    description: ''
};

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
            {/* Render show details and cast here */}
        </div>
    );
};

export default ViewController;
