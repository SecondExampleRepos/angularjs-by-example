import React, { useEffect } from 'react';

interface PremieresControllerProps {
    shows: any[];
    setPageValues: (values: { title: string; description: string; loading: boolean }) => void;
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows, setPageValues }) => {
    useEffect(() => {
        // Set page title and description
        setPageValues({
            title: "PREMIERES",
            description: "Brand new shows showing this month.",
            loading: false
        });
    }, [setPageValues]);

    return (
        <div>
            {/* Render the shows here */}
            {shows.map((show, index) => (
                <div key={index}>{show.name}</div>
            ))}
        </div>
    );
};

export default PremieresController;
