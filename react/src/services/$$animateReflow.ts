// react/src/services/$$animateReflow.ts

import { useEffect, useRef } from 'react';

const useAnimateReflow = (callback: () => void) => {
  const requestAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleReflow = () => {
      callback();
    };

    requestAnimationFrameRef.current = requestAnimationFrame(handleReflow);

    return () => {
      if (requestAnimationFrameRef.current !== null) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [callback]);
};

export default useAnimateReflow;