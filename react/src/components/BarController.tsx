import React, { useState, useEffect } from 'react';
import { PageValues } from '../services/pageValues'; // Importing PageValues from the appropriate module

const BarController: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        // Fetch or assign PageValues to data
        setData(PageValues);
    }, []);

    return (
        <div>
            {/* Render the data or any other UI elements here */}
            {data && (
                <div>
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                </div>
            )}
        </div>
    );
};

export default BarController;
