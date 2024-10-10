// Converted from src/sections/popular/popular.ctrl.js

import React, { useState, useEffect } from 'react';
import Show from '../directives/show'; // Assuming Show is the converted component from AngularJS

interface PopularControllerProps {
    shows: any[]; // Define the structure of a show object if available
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
    const [pageTitle, setPageTitle] = useState<string>("POPULAR");
    const [pageDescription, setPageDescription] = useState<string>("The most popular TV shows.");

    useEffect(() => {
        // Set page title and description
        document.title = pageTitle;
        // Assuming there's a way to set meta description in your app
        // setMetaDescription(pageDescription);
    }, [pageTitle, pageDescription]);

    return (
        <div className="trending-results">
            {shows.length === 0 ? (
                <div className="no-data">There are no popular shows available to display</div>
            ) : (
                <ul className="list-of-shows">
                    {shows.map((show, index) => (
                        <li key={index} className="col-xs-6 col-md-4 repeat-animation">
                            <Show show={show} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PopularController;
