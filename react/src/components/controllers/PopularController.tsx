// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';
import PageValues from '../../utils/constants/PageValues';

type ShowType = {
  id: number;
  name: string;
};

const PopularController: React.FC = () => {
  const [shows, setShows] = useState<ShowType[]>([]);

  useEffect(() => {
    // Set page title and description
    PageValues.title = "POPULAR";
    PageValues.description = "The most popular TV shows.";

    // Fetch popular shows
    ShowService.getPopular()
      .then((data) => {
        setShows(data);
      })
      .catch((error) => {
        console.error('Error fetching popular shows:', error);
      });
  }, []);

  return (
    <div>
      <h1>Popular Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
