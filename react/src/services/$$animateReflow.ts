// react/src/services/$$animateReflow.ts

import { useEffect, useRef } from 'react';

type ReflowCallback = () => void;

const useAnimateReflow = (callback: ReflowCallback) => {
  const callbackRef = useRef<ReflowCallback | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleReflow = () => {
      if (callbackRef.current) {
        callbackRef.current();
      }
    };

    requestAnimationFrame(handleReflow);

    return () => {
      // Cleanup if necessary
    };
  }, []);
};

export default useAnimateReflow;