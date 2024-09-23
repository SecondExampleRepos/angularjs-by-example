// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

// Importing PageValues from the correct path based on the directory structure
import PageValues from '../../utils/constants/PageValues';

const BarController: React.FC = () => {
    // Setup the view model object
    const vm = {
        data: PageValues // PageValues is now correctly imported
    };

    return (
        <div>
            {/* Render logic for BarController can be added here */}
        </div>
    );
};

export default BarController;
