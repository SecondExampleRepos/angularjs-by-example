import { useEffect } from 'react';

const $$animateReflow = (callback: () => void) => {
  useEffect(() => {
    const frameId = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
};

export default $$animateReflow;