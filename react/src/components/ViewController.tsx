import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageValues } from '../utils/constants/PageValues';
import { ShowService } from '../services/ShowService';

interface Show {
    id: number;
    original_name: string;
    cast: Array<any>;
}

const ViewController: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<Show | null>(null);

    useEffect(() => {
        const fetchShow = async () => {
            const showData = await ShowService.get(id);
            setShow(showData);
            PageValues.title = "VIEW";
            PageValues.description = `Overview, seasons & info for '${showData.original_name}'.`;
        };

        fetchShow();
    }, [id]);

    useEffect(() => {
        if (show) {
            const fetchCast = async () => {
                const response = await ShowService.getCast(show.id);
                setShow(prevShow => prevShow ? { ...prevShow, cast: response.cast } : null);
            };

            fetchCast();
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
            {/* Render other show details and cast here */}
        </div>
    );
};

export default ViewController;
