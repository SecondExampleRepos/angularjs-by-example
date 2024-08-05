import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import PageValues from '../utils/constants/PageValues';

interface Show {
    id: number;
    original_name: string;
    cast: Array<any>;
}

const ViewController: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<Show | null>(null);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show?.original_name}'.`;

        // Fetch show details
        const fetchShowDetails = async () => {
            const showDetails = await ShowService.getShowDetails(id);
            setShow(showDetails);
        };

        fetchShowDetails();
    }, [id, show?.original_name]);

    useEffect(() => {
        if (show) {
            // Fetch cast details
            const fetchCastDetails = async () => {
                const response = await ShowService.getCast(show.id);
                setShow(prevShow => prevShow ? { ...prevShow, cast: response.cast } : null);
            };

            fetchCastDetails();
        }
    }, [show]);

    const setBannerImage = () => {
        return {
            background: 'url() no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '100% 0%'
        };
    };

    if (!show) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{show.original_name}</h1>
            <div style={setBannerImage()}></div>
            {/* Render cast details */}
            <ul>
                {show.cast.map((member, index) => (
                    <li key={index}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewController;
