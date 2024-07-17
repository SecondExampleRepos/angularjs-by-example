import React, { useEffect, useState } from 'react';

// Assuming shows is passed as a prop to the component
interface PopularControllerProps {
    shows: any[];
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);

    useEffect(() => {
        // Set page title and description
        setTitle("POPULAR");
        setDescription("The most popular TV shows.");
    }, []);

    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show}</li>
                ))}
            </ul>
        </div>
    );
};

export default PopularController;
