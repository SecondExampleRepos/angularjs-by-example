import React, { useState, useEffect } from 'react';

// Assuming PageValues is a service that we need to import
import { PageValues } from '../../services/page.val';

interface PageValuesType {
    title: string | null;
    description: string | null;
    loading: boolean;
}

const BarController: React.FC = () => {
    const [data, setData] = useState<PageValuesType>({
        title: null,
        description: null,
        loading: false
    });

    useEffect(() => {
        // Assuming PageValues is an object with the initial values
        setData(PageValues);
    }, []);

    return (
        <div>
            {/* Render the data as needed */}
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {data.loading && <p>Loading...</p>}
        </div>
    );
};

export default BarController;
