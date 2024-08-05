import React, { useEffect, useState } from 'react';
import PageValues from '../utils/constants/PageValues';

interface Show {
    // Define the structure of a show object
    id: number;
    name: string;
    // Add other relevant fields
}

interface PremieresControllerProps {
    shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
    const [vm, setVm] = useState<{ shows: Show[] }>({ shows: [] });

    useEffect(() => {
        // Set page title and description
        PageValues.title = "PREMIERES";
        PageValues.description = "Brand new shows showing this month.";

        // Setup view model object
        setVm({ shows });
    }, [shows]);

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {vm.shows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PremieresController;
