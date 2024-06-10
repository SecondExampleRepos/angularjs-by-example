import React from 'react';
import useRootScope from '../../hooks/useRootScope';

const ViewComponent: React.FC = () => {
  const { someState, someFunction } = useRootScope();

  return (
    <div>
      <div className="view-banner" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${someState?.show?.backdrop_path || 'assets/images/shattered.png'})` }}></div>
      <div className="view-title">
        <div className="container">
          {someState?.show?.original_name} ({new Date(someState?.show?.first_air_date).getFullYear()})
          <ul className="pull-right">
            <li><span className="icon icon-heart3"></span> {someState?.show?.vote_average}</li>
            <li><span className="icon icon-tags"></span> <span>{someState?.show?.genres?.map((genre, index) => (
              <span key={index}>{genre.name}{index < someState.show.genres.length - 1 ? ', ' : ''}</span>
            ))}</span></li>
            <li><span className="icon icon-info2"></span> {someState?.show?.status}</li>
          </ul>
        </div>
      </div>
      <div className="view-container">
        <h2>Show Summary</h2>
        <div className="view-section view-top">
          <div className="poster">
            <img src={`http://image.tmdb.org/t/p/w342/${someState?.show?.poster_path}`} alt="Poster" onError={(e) => e.currentTarget.src = 'assets/images/fallback-thin.jpg'} />
          </div>
          {someState?.show?.overview ? (
            <p>{someState.show.overview}</p>
          ) : (
            <p className="no-overview">No overview is available for this show</p>
          )}
          <div className="buttons">
            <a href={someState?.show?.homepage} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-info">
              <span className="icon icon-home"></span> Homepage
            </a>
          </div>
          <div className="clearfix"></div>
        </div>
        <h2>Seasons</h2>
        <div className="view-section">
          {someState?.show?.seasons?.length > 0 ? (
            <ul className="view-list">
              {someState.show.seasons.map((season, index) => (
                season.episode_count > 0 && (
                  <li key={index}>
                    <img src={`http://image.tmdb.org/t/p/w185/${season.poster_path}`} alt="Season Poster" onError={(e) => e.currentTarget.src = 'assets/images/fallback-thin.jpg'} />
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
          {someState?.show?.cast?.length > 0 ? (
            <ul className="view-list">
              {someState.show.cast.map((actor, index) => (
                <li key={index}>
                  <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} alt="Actor Profile" onError={(e) => e.currentTarget.src = 'assets/images/fallback-thin.jpg'} />
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

export default ViewComponent;