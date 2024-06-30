import React from 'react';

interface Genre {
  name: string;
}

interface Season {
  episode_count: number;
  poster_path: string;
  season_number: number;
}

interface Actor {
  profile_path: string;
  name: string;
  character: string;
}

interface Show {
  backdrop_path: string;
  original_name: string;
  first_air_date: string;
  vote_average: number;
  genres: Genre[];
  status: string;
  overview: string | null;
  homepage: string;
  poster_path: string;
  seasons: Season[];
  cast: Actor[];
}

interface ViewProps {
  show: Show;
}

const View: React.FC<ViewProps> = ({ show }) => {
  return (
    <div>
      <div className="view-banner" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${show.backdrop_path})` }}>
        <img src="assets/images/shattered.png" alt="default" />
      </div>
      <div className="view-title">
        <div className="container">
          {show.original_name} ({new Date(show.first_air_date).getFullYear()})
          <ul className="pull-right">
            <li><span className="icon icon-heart3"></span> {show.vote_average}</li>
            <li><span className="icon icon-tags"></span> <span>{show.genres.map((genre, index) => (
              <span key={index}>{genre.name}{index < show.genres.length - 1 ? ', ' : ''}</span>
            ))}</span></li>
            <li><span className="icon icon-info2"></span> {show.status}</li>
          </ul>
        </div>
      </div>
      <div className="view-container">
        <h2>Show Summary</h2>
        <div className="view-section view-top">
          <div className="poster">
            <img src={`http://image.tmdb.org/t/p/w342/${show.poster_path}`} alt="poster" />
          </div>
          {show.overview ? (
            <p>{show.overview}</p>
          ) : (
            <p className="no-overview">No overview is available for this show</p>
          )}
          <div className="buttons">
            <a href={show.homepage} target="_blank" className="btn btn-lg btn-info" rel="noopener noreferrer">
              <span className="icon icon-home"></span> Homepage
            </a>
          </div>
          <div className="clearfix"></div>
        </div>
        <h2>Seasons</h2>
        <div className="view-section">
          {show.seasons.length > 0 ? (
            <ul className="view-list">
              {show.seasons.map((season, index) => (
                season.episode_count > 0 && (
                  <li key={index}>
                    <img src={`http://image.tmdb.org/t/p/w185/${season.poster_path}`} alt="season poster" />
                    <div className="item-info">
                      <div className="col-md-2">#{season.season_number}</div>
                      <div className="col-md-10">Episode Count: {season.episode_count}</div>
                    </div>
                  </li>
                )
              ))}
            </ul>
          ) : (
            <p className="no-data">No season information available</p>
          )}
        </div>
        <h2>Cast</h2>
        <div className="view-section cast-container">
          {show.cast.length > 0 ? (
            <ul className="view-list">
              {show.cast.map((actor, index) => (
                <li key={index}>
                  <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} alt="actor profile" />
                  <div className="item-info">
                    {actor.name} as <br />
                    <strong>{actor.character}</strong>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No cast information available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
