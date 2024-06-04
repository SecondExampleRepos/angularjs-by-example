import React, { useEffect, useState } from 'react';
import useRootScope from '../../hooks/useRootScope';

interface Show {
  backdrop_path: string;
  original_name: string;
  first_air_date: string;
  vote_average: number;
  genres: { name: string }[];
  status: string;
  overview: string | null;
  poster_path: string;
  homepage: string;
  seasons: { episode_count: number; poster_path: string; season_number: number }[];
  cast: { profile_path: string; name: string; character: string }[];
}

const ViewComponent: React.FC = () => {
  const { someState, setSomeState, someFunction } = useRootScope();
  const [view, setView] = useState<{ show: Show } | null>(null);

  useEffect(() => {
    // Fetch the show data and set it to the state
    const fetchShowData = async () => {
      try {
        const response = await fetch('/api/show'); // Replace with actual API endpoint
        const data = await response.json();
        setView({ show: data });
      } catch (error) {
        console.error('Error fetching show data:', error);
      }
    };

    fetchShowData();
  }, []);

  if (!view) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="view-banner" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/original/${view.show.backdrop_path})` }}></div>
      <div className="view-title">
        <div className="container">
          {view.show.original_name} ({new Date(view.show.first_air_date).getFullYear()})
          <ul className="pull-right">
            <li><span className="icon icon-heart3"></span> {view.show.vote_average}</li>
            <li><span className="icon icon-tags"></span> <span>{view.show.genres.map((genre, index) => (
              <span key={index}>{genre.name}{index < view.show.genres.length - 1 ? ', ' : ''}</span>
            ))}</span></li>
            <li><span className="icon icon-info2"></span> {view.show.status}</li>
          </ul>
        </div>
      </div>
      <div className="view-container">
        <h2>Show Summary</h2>
        <div className="view-section view-top">
          <div className="poster">
            <img src={`http://image.tmdb.org/t/p/w342/${view.show.poster_path}`} alt="Poster" />
          </div>
          {view.show.overview ? (
            <p>{view.show.overview}</p>
          ) : (
            <p className="no-overview">No overview is available for this show</p>
          )}
          <div className="buttons">
            <a href={view.show.homepage} target="_blank" className="btn btn-lg btn-info"><span className="icon icon-home"></span> Homepage</a>
          </div>
          <div className="clearfix"></div>
        </div>
        <h2>Seasons</h2>
        <div className="view-section">
          {view.show.seasons.length > 0 ? (
            <ul className="view-list">
              {view.show.seasons.map((season, index) => (
                season.episode_count > 0 && (
                  <li key={index}>
                    <img src={`http://image.tmdb.org/t/p/w185/${season.poster_path}`} alt="Season Poster" />
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
          {view.show.cast.length > 0 ? (
            <ul className="view-list">
              {view.show.cast.map((actor, index) => (
                <li key={index}>
                  <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} alt="Actor Profile" />
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