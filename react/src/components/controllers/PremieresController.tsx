// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';

interface Show {
  id: number;
  original_name: string;
}

const PremieresController: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    ShowService.getPremieres().then((data) => {
      setShows(data);
    });
  }, []);

  return (
    <div>
      <h1>PREMIERES</h1>
      <p>Brand new shows showing this month.</p>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.original_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
