import React, { useState, useEffect } from 'react';

// Assuming PageValues is a constant or service that needs to be imported
import { PageValues } from '../utils/constants/PageValues';

interface BarControllerProps {}

const BarController: React.FC<BarControllerProps> = () => {
    const [data, setData] = useState(PageValues);

    useEffect(() => {
        // Any side effects or data fetching logic can be added here
    }, []);

    return (
        <div>
            {/* Render the data or any other UI elements here */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default BarController;
