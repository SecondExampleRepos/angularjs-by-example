// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

interface PageValues {
  title: string | null;
  description: string | null;
  loading: boolean;
}

interface BarControllerProps {
  pageValues: PageValues;
}

const BarController: React.FC<BarControllerProps> = ({ pageValues }) => {
  return (
    <div>
      <h1>{pageValues.title}</h1>
      <p>{pageValues.description}</p>
      {pageValues.loading && <div>Loading...</div>}
    </div>
  );
};

export default BarController;
