// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
}

const PopularController: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPopularShows = async () => {
      try {
        const response = await axios.get('/api/tv/popular');
        setShows(response.data.results);
      } catch (error) {
        console.error('Error fetching popular shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularShows();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>POPULAR</h1>
      <p>The most popular TV shows.</p>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
