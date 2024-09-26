// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect } from 'react';

interface Show {
  id: number;
  name: string;
}

interface PopularControllerProps {
  shows: Show[];
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
  const [pageTitle] = React.useState<string>("POPULAR");
  const [pageDescription] = React.useState<string>("The most popular TV shows.");

  useEffect(() => {
    document.title = pageTitle;
    // Assuming there's a way to set meta description in your app
    // setMetaDescription(pageDescription);
  }, [pageTitle, pageDescription]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
