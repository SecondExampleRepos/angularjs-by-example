import React, { useState, useEffect } from 'react';
import PageValues from '../utils/constants/PageValues';

const BarController: React.FC = () => {
    const [data, setData] = useState(PageValues);

    useEffect(() => {
        // Any side effects or data fetching logic can be added here

        // Fetch data or perform any side effects here
        const fetchData = async () => {
            try {
                // Simulate a data fetch
                const response = await new Promise((resolve) =>
                    setTimeout(() => resolve({
                        title: 'Fetched Title',
                        description: 'Fetched Description',
                        loading: false
                    }), 1000)
                );
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
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
