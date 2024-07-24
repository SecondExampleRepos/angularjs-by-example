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
    // This effect can be used to set the page title and description dynamically if needed
    document.title = pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', pageDescription);
    } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.name = "description";
        newMetaDescription.content = pageDescription;
        document.head.appendChild(newMetaDescription);
    }
  }, [pageTitle]);

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
