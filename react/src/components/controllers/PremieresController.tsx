// Converted from src/sections/premieres/premieres.ctrl.js

import React from 'react';

interface PremieresControllerProps {
  shows: Array<any>;
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  // Set page title and description
  React.useEffect(() => {
    document.title = "PREMIERES";
    // Assuming there's a way to set description, as React doesn't have a direct equivalent
    // This could be done using a library like react-helmet
  }, []);

  return (
    <div>
      <h1>Premieres</h1>
      <p>Brand new shows showing this month.</p>
      <div>
        {shows.map((show, index) => (
          <div key={index}>
            {/* Assuming Show is a component that takes a show prop */}
            <Show show={show} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremieresController;
