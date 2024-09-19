// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
}

const PremieresController: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPremieres = async () => {
      try {
        const response = await axios.get('/api/premieres');
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching premieres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremieres();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>PREMIERES</h1>
      <p>Brand new shows showing this month.</p>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
