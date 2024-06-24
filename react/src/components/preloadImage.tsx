import React, { useState, useEffect } from 'react';

interface PreloadImageProps {
  src: string;
  defaultImage?: string;
  fallbackImage?: string;
}

const PreloadImage: React.FC<PreloadImageProps> = ({ src, defaultImage, fallbackImage }) => {
  const [imageSrc, setImageSrc] = useState<string>(defaultImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
    img.onerror = () => {
      if (fallbackImage) {
        setImageSrc(fallbackImage);
      }
    };
  }, [src, fallbackImage]);

  return <img src={imageSrc} alt="Preloaded" />;
};

export default PreloadImage;