// Converted from src/sections/premieres/premieres.ctrl.js

import React from 'react';

interface PremieresControllerProps {
  shows: any[]; // Replace 'any' with a more specific type if available
  PageValues: {
    title: string;
    description: string;
  };
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows, PageValues }) => {
  // Set page title and description
  PageValues.title = "PREMIERES";
  PageValues.description = "Brand new shows showing this month.";

  return (
    <div>
      <h1>{PageValues.title}</h1>
      <p>{PageValues.description}</p>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li> // Assuming 'show' has a 'name' property
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
