// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Show from '../directives/show';
import PageValues from '../../utils/constants/PageValues';

interface Show {
  id: number;
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageDescription, setPageDescription] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    // Set page title and description
    setPageTitle("PREMIERES");
    setPageDescription("Brand new shows showing this month.");
    PageValues.title = pageTitle;
    PageValues.description = pageDescription;
  }, [pageTitle, pageDescription]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <div>
        {shows.map(show => (
          <Show key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default PremieresController;
