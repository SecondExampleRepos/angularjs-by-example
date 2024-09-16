// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

interface Show {
  id: number;
  original_name: string;
  backdrop_path: string;
  cast: Array<{ name: string; character: string; profile_path: string }>;
}

interface CastResponse {
  cast: Array<{ name: string; character: string; profile_path: string }>;
}

const ViewController = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    // Fetch show details
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get<Show>(`http://api.themoviedb.org/3/tv/${id}?api_key=87de9079e74c828116acce677f6f255b`);
        setShow(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    // Fetch cast details
    const fetchCastDetails = async () => {
      try {
        const response = await axios.get<CastResponse>(`http://api.themoviedb.org/3/tv/${id}/credits?api_key=87de9079e74c828116acce677f6f255b`);
        if (show) {
          setShow({ ...show, cast: response.data.cast });
        }
      } catch (error) {
        console.error('Error fetching cast details:', error);
      }
    };

    fetchShowDetails();
    fetchCastDetails();
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <div>
      <h1>{show.original_name}</h1>
      <div style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${show.backdrop_path})`, backgroundSize: 'cover', height: '400px' }}></div>
      <h2>Cast</h2>
      <ul>
        {show.cast.map((actor, index) => (
          <li key={index}>
            <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewController;
