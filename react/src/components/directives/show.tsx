// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ShowProps = {
  show: {
    id: number;
  };
};

type Genre = {
  id: number;
  name: string;
};

const Show: React.FC<ShowProps> = ({ show }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (show.id) {
      axios.get(`/api/shows/${show.id}`).then((response) => {
        setGenres(response.data.genres);
      });
    }
  }, [show.id]);

  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Show;
