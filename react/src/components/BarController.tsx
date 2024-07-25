import React, { useState, useEffect } from 'react';
import PageValues from '../utils/constants/PageValues';

const BarController: React.FC = () => {
    const [data, setData] = useState(PageValues);

    useEffect(() => {
        // Any side effects or data fetching logic can be added here

        // Example: Fetching data from an API and updating the state
        const fetchData = async () => {
            try {
                // Simulate an API call
                const response = await fetch('https://api.example.com/data');
                const result = await response.json();
                setData({
                    title: result.title,
                    description: result.description,
                    loading: false
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(prevData => ({
                    ...prevData,
                    loading: false
                }));
            }
        };

        fetchData();
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
