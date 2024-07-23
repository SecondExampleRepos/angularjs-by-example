import React, { useState, useEffect } from 'react';

// Assuming shows data is fetched from an API or passed as props
interface Show {
  id: number;
  title: string;
  description: string;
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState("PREMIERES");
  const [pageDescription, setPageDescription] = useState("Brand new shows showing this month.");

  useEffect(() => {
    // Set page title and description
    document.title = pageTitle;
    // Assuming there's a meta description tag in the HTML head
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }
  }, [pageTitle, pageDescription]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <ul>
        {shows.map(show => (
          <li key={show.id}>
            <h2>{show.title}</h2>
            <p>{show.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
