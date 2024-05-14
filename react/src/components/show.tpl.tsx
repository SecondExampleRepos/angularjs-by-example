import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface Genre {
    name: string;
}

interface Show {
    backdrop_path: string;
    first_air_date: string;
    original_name: string;
    vote_average: number;
    origin_country: string[];
    id: number;
}

interface ShowFrameProps {
    genres: Genre[];
    show: Show;
}

const ShowFrame: React.FC<ShowFrameProps> = ({ genres, show }) => {
    const [defaultImage] = useState<string>("assets/images/loading.jpg");
    const [fallbackImage] = useState<string>("assets/images/fallback.jpg");

    const imageUrl = `http://image.tmdb.org/t/p/w780/${show.backdrop_path}`;

    return (
        <div className="show-frame">
            <ul className="genres">
                {genres.map((genre, index) => (
                    <li key={index} className="animate-repeat" style={{ backgroundColor: `rgba(59, 185, 187, ${genres.length / (index + 1) / 5})` }}>
                        {genre.name}
                    </li>
                ))}
            </ul>
            <img
                src={imageUrl}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = fallbackImage;
                }}
                alt="Show backdrop"
            />
            <div className="date label label-dark">
                <span className="icon icon-calendar"></span> {moment(show.first_air_date).format('DD-MM-YYYY')}
            </div>
            <h2>{show.original_name.length > 40 ? `${show.original_name.substring(0, 40)}...` : show.original_name}</h2>
            <div className="inner">
                <ul className="info">
                    <li className="col-xs-6 rating"><span className="icon icon-heart3"></span> {show.vote_average}</li>
                    <li className="col-xs-6 country">
                        <span className="icon icon-earth"></span>
                        {show.origin_country.map((country, index, array) => (
                            <span key={index}>{country}{index < array.length - 1 ? ', ' : ''}</span>
                        ))}
                        {show.origin_country.length === 0 && <span>--</span>}
                    </li>
                    <div className="clearfix"></div>
                </ul>
                <div className="buttons">
                    <a href={`#/view/${show.id}`} className="btn btn-info"><span className="icon icon-arrow-right7"></span> View</a>
                </div>
            </div>
        </div>
    );
};

export default ShowFrame;