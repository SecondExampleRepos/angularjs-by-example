// Converted from src/sections/premieres/premieres.ctrl.js

import React from 'react';

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
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
