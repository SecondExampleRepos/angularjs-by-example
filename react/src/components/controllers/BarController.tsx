// Converted from src/components/bar/bar.ctrl.js

import React from 'react';
import { PageValues } from '../../services/pageValues';

interface BarControllerProps {
  pageValues: typeof PageValues;
}

const BarController: React.FC<BarControllerProps> = ({ pageValues }) => {
  // Setup the view model object
  const vm = {
    data: pageValues,
  };

  return (
    <div>
      <h1>{vm.data.title}</h1>
      <p>{vm.data.description}</p>
    </div>
  );
};

export default BarController;
