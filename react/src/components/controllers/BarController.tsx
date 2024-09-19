// Converted from src/components/bar/bar.ctrl.js

import React from 'react';
import PageValues from '../../utils/constants/PageValues';

const BarController: React.FC = () => {
    // Setup the view model object
    const vm = {
        data: PageValues
    };

    return (
        <div>
            {/* Render the data or any other UI elements as needed */}
            <h1>{vm.data.title}</h1>
            <p>{vm.data.description}</p>
        </div>
    );
};

export default BarController;
