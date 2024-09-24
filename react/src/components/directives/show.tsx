// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/show.fct';

interface ShowProps {
  show: {
    id: number;
  };
}

const Show: React.FC<ShowProps> = ({ show }) => {
  const [genres, setGenres] = useState<Array<string>>([]);

  useEffect(() => {
    ShowService.get(show.id).then(response => {
      setGenres(response.genres);
    });
  }, [show.id]);

  return (
    <div>
      <h2>Show Genres</h2>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Show;
