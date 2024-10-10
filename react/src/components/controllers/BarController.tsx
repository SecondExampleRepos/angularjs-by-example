// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

interface BarControllerProps {
  pageValues: any;
}

const BarController: React.FC<BarControllerProps> = ({ pageValues }) => {
  // Setup the view model object
  const vm = {
    data: pageValues,
  };

  return (
    <div>
      {/* Render logic for BarController can be added here */}
    </div>
  );
};

export default BarController;
