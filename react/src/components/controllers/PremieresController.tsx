// Converted from src/sections/premieres/premieres.ctrl.js

import React from 'react';

interface PremieresControllerProps {
  shows: any[]; // Replace 'any' with a more specific type if available
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  // Set page title and description
  React.useEffect(() => {
    document.title = "PREMIERES";
    // Assuming there's a way to set description, as React doesn't have a direct equivalent
    // You might use a library like react-helmet for setting meta tags
  }, []);

  return (
    <div>
      <h1>Premieres</h1>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li> // Assuming 'name' is a property of show
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
