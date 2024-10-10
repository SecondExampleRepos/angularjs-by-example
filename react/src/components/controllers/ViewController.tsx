// Converted from src/sections/view/view.ctrl.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Show {
    id: number;
    original_name: string;
    first_air_date: string;
    vote_average: number;
    genres: { name: string }[];
    status: string;
    overview: string | null;
    homepage: string;
    seasons: { season_number: number; episode_count: number; poster_path: string }[];
    cast: { name: string; character: string; profile_path: string }[];
    backdrop_path: string;
    poster_path: string;
}

interface ViewControllerProps {
    show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
    const [cast, setCast] = useState<Show['cast']>([]);
    const location = useLocation();

    useEffect(() => {
        document.title = "VIEW";
        // Assuming there's a way to set meta description in your app
        // setMetaDescription(`Overview, seasons & info for '${show.original_name}'.`);

        const fetchCast = async () => {
            try {
                const response = await axios.get<{ cast: Show['cast'] }>(`/api/shows/${show.id}/cast`);
                setCast(response.data.cast);
            } catch (error) {
                console.error('Error fetching cast:', error);
            }
        };

        fetchCast();
    }, [show.id, show.original_name]);

    const setBannerImage = () => ({
        background: `url(http://image.tmdb.org/t/p/original/${show.backdrop_path}) no-repeat`,
        backgroundSize: '100%',
        backgroundPosition: '100% 0%',
    });

    return (
        <div>
            <div className="view-banner" style={setBannerImage()}></div>
            <div className="view-title">
                <div className="container">
                    {show.original_name} ({new Date(show.first_air_date).getFullYear()})
                    <ul className="pull-right">
                        <li><span className="icon icon-heart3"></span> {show.vote_average}</li>
                        <li><span className="icon icon-tags"></span> {show.genres.map((genre, index) => (
                            <span key={index}>{genre.name}{index < show.genres.length - 1 ? ', ' : ''}</span>
                        ))}</li>
                        <li><span className="icon icon-info2"></span> {show.status}</li>
                    </ul>
                </div>
            </div>
            <div className="view-container">
                <h2>Show Summary</h2>
                <div className="view-section view-top">
                    <div className="poster">
                        <img src={`http://image.tmdb.org/t/p/w342/${show.poster_path}`} alt="Poster" />
                    </div>
                    {show.overview ? (
                        <p>{show.overview}</p>
                    ) : (
                        <p className="no-overview">No overview is available for this show</p>
                    )}
                    <div className="buttons">
                        <a href={show.homepage} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-info">
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
                    {cast.length > 0 ? (
                        <ul className="view-list">
                            {cast.map((actor, index) => (
                                <li key={index}>
                                    <img src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`} alt="Actor" />
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

export default ViewController;
