// Converted from src/directives/ngEnter.drct.js

import React, { useEffect } from 'react';

interface NgEnterProps {
  onEnter: () => void;
}

const NgEnter: React.FC<NgEnterProps> = ({ onEnter }) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnter();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onEnter]);

  return null;
};

export default NgEnter;
