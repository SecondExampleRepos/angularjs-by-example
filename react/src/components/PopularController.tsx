import React, { useEffect, useState } from 'react';

// Assuming PageValues is a service that can be imported
import { PageValues } from '../services/PageValuesService';

// Assuming shows is a service or a prop that can be passed down
import { getShows } from '../services/ShowsService';

interface Show {
  // Define the structure of a show object
  id: number;
  name: string;
  // Add other relevant fields
}

const PopularController: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    // Set page title and description
    PageValues.title = "POPULAR";
    PageValues.description = "The most popular TV shows.";

    // Fetch shows and set state
    getShows().then((data) => {
      setShows(data);
    });
  }, []);

  return (
    <div>
      <h1>{PageValues.title}</h1>
      <p>{PageValues.description}</p>
      <ul>
        {shows.map(show => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
