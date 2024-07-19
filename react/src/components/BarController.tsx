import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import PageValues from the appropriate module
import { PageValues } from '../services/pageValues';

const BarController: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch or set PageValues appropriately
        axios.get(PageValues)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {loading ? (
                <div className="page-loader"><div className="throbber"></div></div>
            ) : (
                data && (
                    <div>
                        <h1>{data.title}</h1>
                        <p>{data.description}</p>
                    </div>
                )
            )}
        </div>
    );
};

export default BarController;
