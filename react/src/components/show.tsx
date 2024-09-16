// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ShowProps {
  show: {
    id: number;
    backdrop_path: string;
    first_air_date: string;
    original_name: string;
    vote_average: number;
    origin_country: string[];
  };
}

interface Genre {
  name: string;
}

const ShowComponent: React.FC<ShowProps> = ({ show }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`http://api.themoviedb.org/3/tv/${show.id}?api_key=87de9079e74c828116acce677f6f255b`);
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
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
            style={{ backgroundColor: `rgba(59, 185, 187, ${genres.length / (index + 1) / 5})` }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
      <img
        src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
        alt={show.original_name}
        onError={(e) => (e.currentTarget.src = 'assets/images/fallback.jpg')}
      />
      <div className="date label label-dark">
        <span className="icon icon-calendar"></span> {moment(show.first_air_date).format('DD-MM-YYYY')}
      </div>
      <h2>{show.original_name}</h2>
      <div className="inner">
        <ul className="info">
          <li className="col-xs-6 rating">
            <span className="icon icon-heart3"></span> {show.vote_average}
          </li>
          <li className="col-xs-6 country">
            <span className="icon icon-earth"></span>{' '}
            {show.origin_country.length > 0 ? show.origin_country.join(', ') : '--'}
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

export default ShowComponent;
