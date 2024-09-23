// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

// Define the type for PageValues
interface PageValuesType {
    title: string | null;
    description: string | null;
    loading: boolean;
}

// Mock PageValues as we don't have the actual service
const PageValues: PageValuesType = {
    title: null,
    description: null,
    loading: false
};

// BarController component
const BarController: React.FC = () => {
    // Setup the view model object
    const vm = {
        data: PageValues
    };

    return (
        <div>
            <h1>{vm.data.title}</h1>
            <p>{vm.data.description}</p>
            {vm.data.loading && <p>Loading...</p>}
        </div>
    );
};

export default BarController;
