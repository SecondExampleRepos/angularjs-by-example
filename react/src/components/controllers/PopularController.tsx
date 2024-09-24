// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/show.fct';

interface PopularControllerProps {
  shows: Array<any>;
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState<string>('');
  const [pageDescription, setPageDescription] = useState<string>('');

  useEffect(() => {
    setPageTitle('POPULAR');
    setPageDescription('The most popular TV shows.');
    document.title = pageTitle;
    // Assuming PageValues.description is used for setting meta description or similar
    // Set meta description or similar here if needed
  }, [pageTitle, pageDescription]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
