// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../../services/showService';

interface ShowProps {
  show: {
    id: number;
  };
}

const Show: React.FC<ShowProps> = ({ show }) => {
  const [genres, setGenres] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${show.id}?api_key=${API_KEY}`);
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [show.id]);

  return (
    <div>
      <h1>Show Genres</h1>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Show;
