// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    original_name: string;
    cast: Array<any>;
};

type ViewControllerProps = {
    show: Show;
};

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<Array<any>>([]);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        // Fetch cast information
        const fetchCast = async () => {
            try {
                const response = await axios.get(`http://api.themoviedb.org/3/tv/${show.id}/credits?api_key=87de9079e74c828116acce677f6f255b`);
                setCast(response.data.cast);
            } catch (error) {
                console.error('Failed to fetch cast information', error);
            }
        };

        fetchCast();
    }, [show]);

    const setBannerImage = () => ({
        background: 'url() no-repeat',
        backgroundSize: '100%',
        backgroundPosition: '100% 0%'
    });

    return (
        <div style={setBannerImage()}>
            {/* Render show details and cast here */}
        </div>
    );
};

export default ViewController;
