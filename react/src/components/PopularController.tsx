// Converted from src/sections/popular/popular.ctrl.js

import React, { useState, useEffect } from 'react';

interface Show {
  // Define the properties of a show object based on the usage in the original code
  id: number;
  name: string;
  // Add other relevant properties as needed
}

interface PopularControllerProps {
  shows: Show[];
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState<string>('POPULAR');
  const [pageDescription, setPageDescription] = useState<string>('The most popular TV shows.');

  useEffect(() => {
    // This effect simulates setting page values similar to AngularJS's PageValues service
    document.title = pageTitle;
    // You can also update meta description or other page-related values here if needed
  }, [pageTitle]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <ul>
        {shows.map(show => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
