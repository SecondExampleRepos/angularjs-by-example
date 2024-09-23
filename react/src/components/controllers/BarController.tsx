// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

// PageValues module is missing, creating a mock object to resolve the error
const PageValues = {
    title: "Default Title",
    description: "Default Description"
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
