import React, { useState, useEffect } from 'react';

interface PreloadImageProps {
  ngSrc: string;
  defaultImage?: string;
  fallbackImage?: string;
}

const PreloadImage: React.FC<PreloadImageProps> = ({ ngSrc, defaultImage, fallbackImage }) => {
  const [src, setSrc] = useState<string>(defaultImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=');

  useEffect(() => {
    const img = new Image();
    img.src = ngSrc;

    const handleLoad = () => {
      setSrc(ngSrc);
    };

    const handleError = () => {
      if (fallbackImage) {
        setSrc(fallbackImage);
      }
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [ngSrc, fallbackImage]);

  return <img src={src} alt="" />;
};

export default PreloadImage;
