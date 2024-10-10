// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../../services/ShowService';

interface Show {
    id: string;
}

interface PremieresControllerProps {
    shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    const [premieres, setPremieres] = useState<Show[]>([]);

    useEffect(() => {
        const fetchPremieres = async () => {
            try {
                const premieresData = await ShowService.getPremieres();
                setPremieres(premieresData);
            } catch (error) {
                console.error('Failed to fetch premieres', error);
            }
        };

        fetchPremieres();
    }, []);

    return (
        <ul className="list-of-shows">
            {premieres.map((show, index) => (
                <li key={index} className="col-xs-6 col-md-4">
                    <ShowComponent show={show} />
                </li>
            ))}
        </ul>
    );
};

const ShowComponent: React.FC<{ show: Show }> = ({ show }) => {
    return (
        <div>
            {/* Render show details here */}
        </div>
    );
};

export default PremieresController;
