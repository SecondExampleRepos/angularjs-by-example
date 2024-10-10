// Converted from src/components/bar/bar.ctrl.js

import React from 'react';
import { PageValues } from '../../services/PageValues';

interface BarControllerProps {
    pageValues: typeof PageValues;
}

const BarController: React.FC<BarControllerProps> = ({ pageValues }) => {
    // Setup the view model object
    const vm = {
        data: pageValues
    };

    return (
        <div>
            {/* Render logic can be added here if needed */}
        </div>
    );
};

export default BarController;
