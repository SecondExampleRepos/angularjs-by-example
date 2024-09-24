// Converted from src/components/bar/bar.ctrl.js

import React from 'react';
import PageValues from '../utils/constants/PageValues';

const BarController: React.FC = () => {
    // Setup the view model object
    const [data, setData] = React.useState(PageValues);

    return (
        <div>
            {/* Render logic for BarController can be added here */}
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {data.loading && <p>Loading...</p>}
        </div>
    );
};

export default BarController;
