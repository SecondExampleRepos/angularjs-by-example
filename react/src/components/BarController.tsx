import React from 'react';
import { PageValues } from '../utils/constants/PageValues';

const BarController: React.FC = () => {
    // Setup the view model object
    const vm = {
        data: PageValues
    };

    return (
        <div>
            {/* Render logic for BarController can be added here */}
            <h1>{vm.data.title}</h1>
            <p>{vm.data.description}</p>
            {vm.data.loading && <p>Loading...</p>}
        </div>
    );
};

export default BarController;
