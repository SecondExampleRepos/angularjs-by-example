// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useState, useEffect } from 'react';
import Show from '../directives/show';

interface Show {
  id: number;
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState<string>("PREMIERES");
  const [pageDescription, setPageDescription] = useState<string>("Brand new shows showing this month.");

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
          <Show key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default PremieresController;
