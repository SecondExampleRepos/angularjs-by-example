// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

interface PageValues {
  title: string | null;
  description: string | null;
  loading: boolean;
}

const PageValues: PageValues = {
  title: null,
  description: null,
  loading: false,
};

const BarController: React.FC = () => {
  // Setup the view model object
  const vm = {
    data: PageValues,
  };

  return (
    <div>
      <h1>{vm.data.title}</h1>
      <p>{vm.data.description}</p>
    </div>
  );
};

export default BarController;
