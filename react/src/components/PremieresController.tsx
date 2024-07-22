import React, { useState, useEffect } from 'react';

// Assuming shows data is fetched from an API or passed as props
interface Show {
  id: number;
  title: string;
  description: string;
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  // Set page title and description
  useEffect(() => {
    document.title = "PREMIERES";
    // Assuming there's a way to set meta description in React
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Brand new shows showing this month.");
    }
  }, []);

  return (
    <div>
      <h1>Premieres</h1>
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
