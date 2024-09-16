// Converted from src/components/bar/bar.ctrl.js

import React from 'react';

// Define the PageValues type based on the AngularJS value
type PageValuesType = {
  title: string | null;
  description: string | null;
  loading: boolean;
};

// Mock PageValues for demonstration purposes
const PageValues: PageValuesType = {
  title: null,
  description: null,
  loading: false,
};

const BarController: React.FC = () => {
  // Setup the view model object equivalent in React
  const [data, setData] = React.useState<PageValuesType>(PageValues);

  // Render the component
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default BarController;
