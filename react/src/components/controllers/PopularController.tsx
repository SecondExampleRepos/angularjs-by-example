// Converted from src/sections/popular/popular.ctrl.js

import React from 'react';

interface PageValues {
  title: string | null;
  description: string | null;
}

interface PopularControllerProps {
  shows: Array<any>; // Define a more specific type if available
  pageValues: PageValues;
}

const PopularController: React.FC<PopularControllerProps> = ({ shows, pageValues }) => {
  // Set page title and description
  pageValues.title = "POPULAR";
  pageValues.description = "The most popular TV shows.";

  return (
    <div>
      <h1>{pageValues.title}</h1>
      <p>{pageValues.description}</p>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li> // Assuming each show has a 'name' property
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
