// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useState, useEffect } from 'react';
// Corrected import path based on context provided
import ShowComponent from '../../components/ShowComponent';

interface Show {
  id: number;
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  const [pageTitle] = useState<string>("PREMIERES");
  const [pageDescription] = useState<string>("Brand new shows showing this month.");

  useEffect(() => {
    // This effect could be used to update document title or other side effects
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <div>
        {shows.map((show) => (
          <ShowComponent key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default PremieresController;
