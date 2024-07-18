import React from 'react';

interface Show {
    // Define the properties of a show here
}

interface PopularProps {
    shows: Show[];
}

const Popular: React.FC<PopularProps> = ({ shows }) => {
    return (
        <div className="trending-results">
            {shows.length === 0 ? (
                <div className="no-data">There are no popular shows available to display</div>
            ) : (
                <ul className="list-of-shows">
                    {shows.map((show, index) => (
                        <li key={index} className="col-xs-6 col-md-4 repeat-animation">
                            <ShowComponent show={show} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

interface ShowComponentProps {
    show: Show;
}

const ShowComponent: React.FC<ShowComponentProps> = ({ show }) => {
    return (
        <div>
            {/* Render show details here */}

            <div>
                <h2>{show.title}</h2>
                <p>{show.description}</p>
                <img src={show.imageUrl} alt={show.title} />
            </div>
    );
};

export default Popular;
