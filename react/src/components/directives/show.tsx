// Converted from src/components/show/show.drct.js

import React, { useEffect, useState } from 'react';
import ShowService from '../../services/ShowService';
import { characters } from '../../utils/filters/characters';

interface Show {
  id: number;
  original_name: string;
  vote_average: number;
  origin_country: string[];
  backdrop_path: string;
  first_air_date: string;
}

interface Genre {
  name: string;
}

interface ShowResponse {
  genres: Genre[];
}

interface ShowProps {
  show: Show;
}

const ShowComponent: React.FC<ShowProps> = ({ show }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await ShowService.get(show.id);
      if (response && 'genres' in response) {
        setGenres(response.genres);
      }
    };

    fetchGenres();
  }, [show.id]);

  const renderList = (items: string[], className: string, iconClass: string, fallback: string) => (
    <li className={className}>
      <span className={iconClass}></span>{' '}
      {items.length > 0 ? items.join(', ') : <span>{fallback}</span>}
    </li>
  );

  const renderGenres = () => (
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
  );

  const renderInfo = () => (
    <ul className="info">
      {renderList([show.vote_average.toString()], "col-xs-6 rating", "icon icon-heart3", "--")}
      {renderList(show.origin_country, "col-xs-6 country", "icon icon-earth", "--")}
      <div className="clearfix"></div>
    </ul>
  );

  return (
    <div className="show-frame">
      {renderGenres()}
      <img
        src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
        alt={show.original_name}
        onError={(e) => {
          e.currentTarget.src = '/assets/images/fallback.jpg';
        }}
      />
      <div className="date label label-dark">
        <span className="icon icon-calendar"></span> {show.first_air_date}
      </div>
      <h2>{characters(show.original_name, 40, true)}</h2>
      <div className="inner">
        {renderInfo()}
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
