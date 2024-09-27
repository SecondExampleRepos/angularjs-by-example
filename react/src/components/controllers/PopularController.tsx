// Converted from src/sections/popular/popular.ctrl.js

import React, { useState } from 'react';

interface Show {
  id: number;
  name: string; // Added relevant field
  // Add other relevant fields as needed
}

interface PopularControllerProps {
  shows: Show[];
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
  const [pageTitle] = useState("POPULAR");
  const [pageDescription] = useState("The most popular TV shows.");

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li> {/* Displaying show name instead of id */}
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
