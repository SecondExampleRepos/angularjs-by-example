// react/src/services/$$animateReflow.ts

import { useEffect, useRef } from 'react';

type AnimateReflowCallback = () => void;

const useAnimateReflow = (callback: AnimateReflowCallback) => {
  const requestAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const reflow = () => {
      callback();
    };

    requestAnimationFrameRef.current = requestAnimationFrame(reflow);

    return () => {
      if (requestAnimationFrameRef.current !== null) {
        cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    };
  }, [callback]);
};

export default useAnimateReflow;
