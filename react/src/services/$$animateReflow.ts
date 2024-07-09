import { useEffect, useRef } from 'react';

/**
 * Service to handle reflow animations in React
 */
const useAnimateReflow = (callback: () => void) => {
  const requestAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleReflow = () => {
      if (requestAnimationFrameRef.current !== null) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
      requestAnimationFrameRef.current = requestAnimationFrame(() => {
        callback();
      });
    };

    handleReflow();

    return () => {
      if (requestAnimationFrameRef.current !== null) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [callback]);

  return null;
};

export default useAnimateReflow;
