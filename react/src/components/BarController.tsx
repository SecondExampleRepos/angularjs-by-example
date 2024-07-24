import React, { useState, useEffect } from 'react';
import PageValues from '../utils/constants/PageValues';

const BarController: React.FC = () => {
    const [data, setData] = useState(PageValues);

    useEffect(() => {
        // This effect runs once on component mount
        // You can add any initialization logic here if needed
    }, []);

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {data.loading && <p>Loading...</p>}
        </div>
    );
};

export default BarController;
