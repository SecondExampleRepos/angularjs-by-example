// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import showService from '../services/ShowService';

interface ShowProps {
  show: {
    id: string;
    backdrop_path: string;
    first_air_date: string;
    original_name: string;
    vote_average: number;
    origin_country: string[];
  };
}

const Show: React.FC<ShowProps> = ({ show }) => {
  const [genres, setGenres] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await showService.get(show.id);
        setGenres(response.genres);
      } catch (error) {
        console.error('Failed to fetch genres', error);
      }
    };

    fetchGenres();
  }, [show.id]);

  return (
    <div className="show-frame">
      <ul className="genres">
        {genres.map((genre, index) => (
          <li
            key={index}
            className="animate-repeat"
            style={{
              backgroundColor: `rgba(59, 185, 187, ${genres.length / (index + 1) / 5})`,
            }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
      <img
        src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
        alt={show.original_name}
        onError={(e) => {
          e.currentTarget.src = 'assets/images/fallback.jpg';
        }}
      />
      <div className="date label label-dark">
        <span className="icon icon-calendar"></span> {show.first_air_date}
      </div>
      <h2>{show.original_name}</h2>
      <div className="inner">
        <ul className="info">
          <li className="col-xs-6 rating">
            <span className="icon icon-heart3"></span> {show.vote_average}
          </li>
          <li className="col-xs-6 country">
            <span className="icon icon-earth"></span>{' '}
            {show.origin_country.length > 0
              ? show.origin_country.join(', ')
              : '--'}
          </li>
          <div className="clearfix"></div>
        </ul>
        <div className="buttons">
          <a href={`#/view/${show.id}`} className="btn btn-info">
            <span className="icon icon-arrow-right7"></span> View
          </a>
        </div>
      </div>
    </div>
  );
};

export default Show;
