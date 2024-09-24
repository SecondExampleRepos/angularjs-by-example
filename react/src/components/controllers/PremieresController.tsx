// Converted from src/sections/premieres/premieres.ctrl.js

import React from 'react';
import Show from '../directives/show'; // Updated import path for Show component

interface PremieresControllerProps {
  shows: Array<any>;
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  // Set page title and description
  document.title = "PREMIERES";
  const pageDescription = "Brand new shows showing this month.";

  return (
    <div>
      <h1>{document.title}</h1>
      <p>{pageDescription}</p>
      <div>
        {shows.map((show, index) => (
          <div key={index}>
            {/* Assuming Show component is used here */}
            <Show show={show} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremieresController;
