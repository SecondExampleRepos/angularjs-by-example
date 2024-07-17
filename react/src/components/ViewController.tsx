import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageValues } from '../../services/page.val';
import { ShowService } from '../../services/show.fct';

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
        ShowService.get(id).then((response) => {
            setShow(response);
        });

        // Fetch show cast
        ShowService.getCast(id).then((response) => {
            if (show) {
                setShow({ ...show, cast: response.cast });
            }
        });
    }, [id, show]);

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
            <div>
                <h2>Cast</h2>
                <ul>
                    {show.cast.map((member, index) => (
                        <li key={index}>{member.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewController;
