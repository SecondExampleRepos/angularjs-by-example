// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

// The module '../../utils/constants/PageValues' does not exist or is not correctly imported. 
// Ensure that the file exists at the specified path and that it exports the necessary values.
// Since the module cannot be found, we will mock the PageValues for demonstration purposes.
const PageValues = {
    title: 'Default Title', // Mocked title
    description: 'Default Description' // Mocked description
};

const BarController: React.FC = () => {
    // Setup the view model object
    const vm = {
        data: PageValues
    };

    return (
        <div>
            <h1>{vm.data.title}</h1>
            <p>{vm.data.description}</p>
        </div>
    );
};

export default BarController;
