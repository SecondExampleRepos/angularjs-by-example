// react/src/services/$$animateReflow.ts

import { useEffect, useRef } from 'react';

const $$animateReflow = (callback: () => void) => {
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

export default $$animateReflow;