import { useEffect } from 'react';

// Define the $$animateReflow service
const $$animateReflow = (callback: () => void) => {
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      callback();
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [callback]);
};

export default $$animateReflow;