// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

// Assuming PageValues is a service that provides some page-related values
interface PageValues {
    title: string | null;
    description: string | null;
    loading: boolean;
}

interface BarControllerProps {
    pageValues: PageValues;
}

const BarController: React.FC<BarControllerProps> = ({ pageValues }) => {
    // Setup the view model object
    const vm = {
        data: pageValues
    };

    return (
        <div>
            <h1>{vm.data.title}</h1>
            <p>{vm.data.description}</p>
        </div>
    );
};

export default BarController;
