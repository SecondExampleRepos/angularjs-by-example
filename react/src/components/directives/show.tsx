// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';

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
        const response = await ShowService.get(show.id);
        setGenres(response.genres);
      } catch (error) {
        console.error('Failed to fetch genres', error);
      }
    };

    fetchGenres();
  }, [show.id]);

  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Show;
