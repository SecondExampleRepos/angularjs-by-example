// Converted from src/sections/popular/popular.ctrl.js

import React, { useState, useEffect } from 'react';
import PageValues from '../utils/constants/PageValues';

type ShowType = {
  id: number;
  original_name: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  origin_country: string[];
};

type PopularControllerProps = {
  shows: ShowType[];
};

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [pageDescription, setPageDescription] = useState<string | null>(null);

  useEffect(() => {
    // Set page title and description
    setPageTitle("POPULAR");
    setPageDescription("The most popular TV shows.");
  }, []);

  useEffect(() => {
    // Update PageValues with the current title and description
    PageValues.title = pageTitle;
    PageValues.description = pageDescription;
  }, [pageTitle, pageDescription]);

  return (
    <div className="trending-results">
      {shows.length === 0 ? (
        <div className="no-data">There are no popular shows available to display</div>
      ) : (
        <ul className="list-of-shows">
          {shows.map((show) => (
            <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
              <div className="show-frame">
                <img
                  src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
                  alt={show.original_name}
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
                      <span className="icon icon-earth"></span>{" "}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularController;
