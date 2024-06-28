// react/src/services/$$animateReflow.ts

import { useEffect } from 'react';

const $$animateReflow = (callback: () => void) => {
  useEffect(() => {
    const raf = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(raf);
  }, [callback]);
};

export default $$animateReflow;
