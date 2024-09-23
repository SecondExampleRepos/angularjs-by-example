// Converted from src/sections/popular/popular.ctrl.js

import React from 'react';

interface PopularControllerProps {
  shows: Array<any>; // Define the type of shows more specifically if possible
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
  // Set page title and description
  React.useEffect(() => {
    document.title = "POPULAR";
    // Assuming there's a way to set description, e.g., using a meta tag
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "The most popular TV shows.");
    }
  }, []);

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li> // Assuming each show has a 'name' property
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
