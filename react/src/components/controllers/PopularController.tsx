// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';

interface Show {
  id: number;
  original_name: string;
  vote_average: number;
  origin_country: string[];
  backdrop_path: string;
  first_air_date: string;
}

interface PageValues {
  title: string | null;
  description: string | null;
}

const PageValues: PageValues = {
  title: null,
  description: null,
};

const PopularController: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    PageValues.title = "POPULAR";
    PageValues.description = "The most popular TV shows.";

    const fetchPopularShows = async () => {
      const popularShows = await ShowService.getPopular();
      setShows(popularShows);
    };

    fetchPopularShows();
  }, []);

  return (
    <div>
      <h1>{PageValues.title}</h1>
      <p>{PageValues.description}</p>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <h2>{show.original_name}</h2>
            <p>Rating: {show.vote_average}</p>
            <p>Countries: {show.origin_country.join(', ')}</p>
            <img
              src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
              alt={show.original_name}
            />
            <p>First Air Date: {show.first_air_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
