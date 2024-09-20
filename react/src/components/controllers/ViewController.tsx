// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowService from '../../services/ShowService';
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
            const numericId = parseInt(id, 10); // Convert id to a number
            ShowService.getShow(numericId).then((data) => { // Use getShow instead of get
                setShow(data);
                PageValues.title = "VIEW";
                PageValues.description = `Overview, seasons & info for '${data.original_name}'.`;
            });

            ShowService.getCast(numericId).then((response) => {
                setShow((prevShow) => prevShow ? { ...prevShow, cast: response.cast } : null);
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
            <h1>{show.original_name}</h1>
            {/* Additional UI elements to display show details and cast */}
        </div>
    );
};

export default ViewController;
