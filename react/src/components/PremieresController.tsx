import React, { useEffect, useState } from 'react';

// Assuming PageValues is a context or a state management object
import { PageValues } from '../utils/constants/PageValues';

interface Show {
  // Define the structure of a show object
  id: number;
  title: string;
  description: string;
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageDescription, setPageDescription] = useState<string>('');

  useEffect(() => {
    // Set page title and description
    setPageTitle('PREMIERES');
    setPageDescription('Brand new shows showing this month.');

    // Assuming PageValues is a global state or context
    PageValues.title = 'PREMIERES';
    PageValues.description = 'Brand new shows showing this month.';
  }, []);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <h2>{show.title}</h2>
            <p>{show.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
