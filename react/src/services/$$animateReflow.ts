// react/src/services/$$animateReflow.ts

import { useEffect, useRef } from 'react';

const useAnimateReflow = (callback: () => void) => {
  const requestAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const reflow = () => {
      if (requestAnimationFrameRef.current !== null) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
      requestAnimationFrameRef.current = requestAnimationFrame(() => {
        callback();
      });
    };

    reflow();

    return () => {
      if (requestAnimationFrameRef.current !== null) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [callback]);

  return null;
};

export default useAnimateReflow;