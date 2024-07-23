import React, { useState, useEffect } from 'react';

// Assuming shows is fetched from an API or passed as a prop
interface Show {
  id: number;
  name: string;
  // Add other relevant fields
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState("PREMIERES");
  const [pageDescription, setPageDescription] = useState("Brand new shows showing this month.");

  useEffect(() => {
    // This effect runs once on mount to set the page title and description
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
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
