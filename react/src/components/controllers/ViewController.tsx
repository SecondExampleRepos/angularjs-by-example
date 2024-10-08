// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowService from '../../services/ShowService';
import { characters } from '../../utils/filters/characters';

interface Show {
  id: number;
  original_name: string;
  vote_average: number;
  origin_country: string[];
  backdrop_path: string;
  first_air_date: string;
  cast: any[];
}

interface PageValues {
  title: string | null;
  description: string | null;
}

const pageValues: PageValues = {
  title: null,
  description: null,
};

const ViewController: React.FC = () => {
  const [show, setShow] = useState<Show | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchShow = async () => {
      const showId = location.pathname.split('/').pop();
      if (showId) {
        const showData = await ShowService.get(parseInt(showId));
        const castData = await ShowService.getCast(parseInt(showId));
        setShow({ ...showData, cast: castData.cast });
      }
    };

    pageValues.title = 'VIEW';
    pageValues.description = `Overview, seasons & info for '${show?.original_name}'.`;

    fetchShow();
  }, [location, show?.original_name]);

  const setBannerImage = () => ({
    background: 'url() no-repeat',
    backgroundSize: '100%',
    backgroundPosition: '100% 0%',
  });

  return (
    <div>
      <h1>{pageValues.title}</h1>
      <p>{pageValues.description}</p>
      {show && (
        <div style={setBannerImage()}>
          <h2>{characters(show.original_name, 40, true)}</h2>
          <p>Rating: {show.vote_average}</p>
          <p>Countries: {show.origin_country.join(', ')}</p>
          <img
            src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
            alt={show.original_name}
          />
          <p>First Air Date: {show.first_air_date}</p>
          <ul>
            {show.cast.map((member, index) => (
              <li key={index}>{member.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewController;
