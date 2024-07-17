import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageValues } from '../../services/page.val';
import { ShowService } from '../../services/show.fct';

interface ViewControllerProps {
    show: any;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        // Set page title and description
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

        // Fetch cast information
        ShowService.getCast(id).then(response => {
            setCast(response.cast);
        });
    }, [id, show.original_name]);

    const setBannerImage = () => {
        return {
            background: 'url() no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '100% 0%'
        };
    };

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <div style={setBannerImage()}></div>
            <div>
                {cast.map((member: any) => (
                    <div key={member.id}>
                        <p>{member.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewController;
