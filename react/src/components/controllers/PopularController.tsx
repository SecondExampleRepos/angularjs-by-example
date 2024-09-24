// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect } from 'react';

interface PopularControllerProps {
  shows: Array<any>;
  setPageValues: (title: string, description: string) => void;
}

const PopularController: React.FC<PopularControllerProps> = ({ shows, setPageValues }) => {
  useEffect(() => {
    setPageValues("POPULAR", "The most popular TV shows.");
  }, [setPageValues]);

  return (
    <div>
      <h1>Popular TV Shows</h1>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
