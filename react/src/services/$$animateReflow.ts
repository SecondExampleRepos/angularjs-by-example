import { useEffect, useRef } from 'react';

const useAnimateReflow = (callback: () => void) => {
  const requestRef = useRef<number | null>(null);

  const animate = () => {
    callback();
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);

  return null;
};

export default useAnimateReflow;