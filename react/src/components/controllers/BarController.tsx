﻿// Converted from src/components/bar/bar.ctrl.js

import React from 'react';
import PageValues from '../../utils/constants/PageValues';

const BarController: React.FC = () => {
    // Setup the view model object
    const data = PageValues;

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </div>
    );
};

export default BarController;
