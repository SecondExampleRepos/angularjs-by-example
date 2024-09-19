// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';

interface Show {
  id: number;
  original_name: string;
}

const PopularController: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    ShowService.getPopularShows().then((data) => {
      setShows(data);
    });
  }, []);

  return (
    <div>
      <h1>POPULAR</h1>
      <p>The most popular TV shows.</p>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.original_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
