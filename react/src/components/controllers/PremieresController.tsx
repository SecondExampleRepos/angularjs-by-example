// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  loading: boolean;
}

const PageValues: PageValues = {
  title: null,
  description: null,
  loading: false,
};

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

const getPremieres = async (): Promise<Show[]> => {
  const date = new Date();
  date.setDate(1);
  const response = await axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      'first_air_date.gte': date.toISOString().split('T')[0],
      append_to_response: 'genres',
    },
  });
  return response.data.results;
};

const PremieresController: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    PageValues.title = 'PREMIERES';
    PageValues.description = 'Brand new shows showing this month.';

    const fetchShows = async () => {
      const premieres = await getPremieres();
      setShows(premieres);
    };

    fetchShows();
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

export default PremieresController;
