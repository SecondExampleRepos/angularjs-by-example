// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageValues from '../utils/constants/PageValues';
import showService from '../services/ShowService';

interface ShowType {
  id: string;
  original_name: string;
  cast: { name: string; character: string; profile_path: string }[];
}

const ViewController: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<ShowType | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const showData = await showService.get(id);
        setShow({ ...showData, cast: [] });
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${showData.original_name}'.`;
      } catch (error) {
        console.error('Failed to fetch show', error);
      }
    };

    fetchShow();
  }, [id]);

  useEffect(() => {
    const fetchCast = async () => {
      if (show) {
        try {
          const castData = await showService.getCast(show.id);
          setShow((prevShow) => prevShow ? { ...prevShow, cast: castData.cast } : null);
        } catch (error) {
          console.error('Failed to fetch cast', error);
        }
      }
    };

    fetchCast();
  }, [show]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.original_name}</h1>
      <div>
        <h2>Cast</h2>
        <ul>
          {show.cast.map((actor, index) => (
            <li key={index}>
              <img
                src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                alt={actor.name}
                onError={(e) => {
                  e.currentTarget.src = 'assets/images/fallback-thin.jpg';
                }}
              />
              <div>
                {actor.name} as <strong>{actor.character}</strong>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewController;
